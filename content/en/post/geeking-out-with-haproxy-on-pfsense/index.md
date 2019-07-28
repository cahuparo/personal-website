---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Geeking out with HAproxy on pfSense"
subtitle: The ultimate port 443 TLS/SSL router
aliases:
 - "/post/116633549315/geeking-out-with-haproxy-on-pfsense-the-ultimate"
slug: geeking-out-with-haproxy-on-pfsense-the-ultimate
summary: "How to use HAproxy to share TCP port 443 for OpenVPN and SSH tunneling."
translationKey: "beginning-with-something-new"
authors: []
tags:
- pfSense
- HAproxy
- SSH
categories: [ "Security", "IT-Operations" ]
date: 2015-04-17T12:35:14+02:00
lastmod: 2015-04-17T12:35:14+02:00
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

{{% alert warning %}}
This post might be outdated and not work, depending on your version of HAproxy and/or pfSense.
{{% /alert %}}

{{% toc %}}

I would like to share my experience on how to transform your pfSense appliance into a layer4 router for sharing all the encrypted traffic we have on port 443 with SSH and OpenVPN traffic.

[SSLlabs.com](https://www.ssllabs.com/) will even give you an A+ for this configuration if you follow it closely.

For SSH, this will not only give you enhanced security and encryption but also a whole lot more flexibility for secure remote access to servers in your corporate network. It will even allow you to bypass a lot of corporate proxy servers (as long as there is no content inspection enabled for HTTPS traffic) and is a real alternative instead of using HTTP CONNECT method (which can easily be blocked).
This solution could even be more blown up to fulfill enterprise level requirements, e.g. granular role-based user authentication. However, this will not be our main topic in this article but will be referenced from time to time.
I know there is this shiny litte tool SSLH out there but this solution is much more flexible due to the power of HAproxy.

All in all, this is what we are going to share via port 443 on a single IP:

- normal HTTPS traffic (acting as normal reverse proxy for securing web traffic)
- normal HTTPS traffic with X509 user certificate authentication
- OpenVPN dial-in traffic
- TLS-tunneled SSH traffic including X509 user certificate authentication (SSLH Gateway)

I am using pfSense to ease HAproxy configuration as it makes things a lot more comfortable. For your reference you may find a haproxy.cfg file[ here](https://gist.github.com/jpawlowski/3f91ef9d0bba49eb0c58) which has been created by pfSense 2.2.6.
[[MORE]]

## Creating internal Certificate Authorities and certificates

We are going to need 2 separate CA’s which we will be creating in the Cert Manager right now. I recommend using the following settings:

	Descriptive name: Acmi VPN Remote Access
	Method: Create an internal Certificate Authority
	Key Length: 4096
	Digest Algorithm: SHA512
	Lifetime: 3650
	Country code: US
	State: NY
	City: New York
	Organisation: Acme Inc.
	Email address: security@example.com
	Common Name: Acmi VPN Remote Access

* * *

	Descriptive name: Acmi SSLH Gateway
	Method: Create an internal Certificate Authority
	Key Length: 4096
	Digest Algorithm: SHA512
	Lifetime: 3650
	Country code: US
	State: NY
	City: New York
	Organisation: Acme Inc.
	Email address: security@example.com
	Common Name: Acmi SSLH Gateway

### Create internal certificate for OpenVPN

Let’s create a quick internal certificate for the OpenVPN server before we will set it up:

	Method: Create an internal Certificate
	Descriptive name: vpn.example.com
	Certificate authority: Acmi VPN Remote Access
	Key Length: 4096
	Digest Algorithm: SHA512
	Certificate Type: Server Certificate
	Lifetime: 3650
	Country code: US
	State: NY
	City: New York
	Organisation: Acme Inc.
	Email address: security@example.com
	Common Name: vpn.example.com
	Alternative Names: TYPE=DNS, VALUE=vpn.example.com

### Create internal certificate for SSLH Gateway

Let’s also create a quick internal certificate for our SSLH Gateway:

	Method: Create an internal Certificate
	Descriptive name: ssh.example.com
	Certificate authority: Acmi SSLH Gateway
	Key Length: 4096
	Digest Algorithm: SHA512
	Certificate Type: Server Certificate
	Lifetime: 3650
	Country code: US
	State: NY
	City: New York
	Organisation: Acme Inc.
	Email address: security@example.com
	Common Name: ssh.example.com
	Alternative Names: TYPE=DNS, VALUE=ssh.example.com

### Create user certificates

Each user who needs to be authorized using OpenVPN, HTTPS-auth secured backends or our SSLH gateway will need to have user certificates being created by our internal CA’s.

For OpenVPN and HTTP-auth users, we will create just one single certificate. We will just use the pfSense internal users for this example, you may extend this to more complex setups on your own.

Open the User Manager, click on edit for your user account and then the plus icon next to the User Certificates section (this will automatically assign the created cert to this user account for your convenience).

Let’s create the OpenVPN and *.vpn.example.com cert first:

	Method: Create an internal Certificate
	Descriptive Name: Acmi John Doe
	Certificate authority: Acmi VPN Remote Access
	Key length: 4096
	Digest Algorithm: SHA512
	Certificate Type: User Certificate
	Lifetime: 3650
	Country code: US
	State: NY
	City: New York
	Organisation: Acme Inc.
	Email address: john.doe@example.com
	Common Name: Acmi John Doe
	Alternative Names:
	  TYPE=email, VALUE=john.doe@example.com
	  TYPE=email, VALUE=netmaster@example.com

You may add other (pseudo/administrative) e-mail addresses here as an alias so you may even restrict access to certain pages/backends, e.g. allow access to the firewall on fw.vpn.example.com only for members of the netmaster staff (meaning this user needs to have netmaster@example.com as an alternative name). This will be kind of role-based authentication if you extend the ACL in the corresponding shared frontend we will be creating for each of the servers later. However, I don’t want this to become too complex here so this is just some inspiration for more advanced enterprise use you may follow up on later.

Let’s now create the SSLH cert:

	Method: Create an internal Certificate
	Descriptive Name: Acmi-SSLH John Doe
	Certificate authority: Acmi SSLH Gateway
	Key length: 4096
	Digest Algorithm: SHA512
	Certificate Type: User Certificate
	Lifetime: 3650
	Country code: US
	State: NY
	City: New York
	Organisation: Acme Inc.
	Email address: john.doe@example.com
	Common Name: Acmi-SSLH John Doe
	Alternative Names:
	  TYPE=email, VALUE=john.doe@example.com
	  TYPE=email, VALUE=hostmaster@example.com

Same info about the alternative names I mentioned above applies here.

### OpenVPN Setup

Create a normal new OpenVPN instance listening on TCP port 1194 (it may use the WAN interface just as normal) using the CA “Acmi VPN Remote Access” and it’s certificate “vpn.example.com” we created above. I will not go any deeper into this as there are much other (and more sophisticated) how-to’s out there in the net.

## Basic HAproxy configuration

We will start with a dummy backend and the second level frontends for HTTPS, HTTPS-auth and SSLH and combine them in a first level frontend instance afterwards.

### Hardening against vulnerability

In the general settings tab, you want to add this to the Global Advanced Pass Through field:

	# Modern browser compatibility only as mentioned here:
	# https://wiki.mozilla.org/Security/Server_Side_TLS
	ssl-default-bind-ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK_
	_tune.ssl.default-dh-param 2048_

	# Time-to-first-Byte (TTFB) value needs to be optimized based on
	# the actual public certificate chain see
	# https://www.igvita.com/2013/10/24
	# /optimizing-tls-record-size-and-buffering-latency/
	tune.ssl.maxrecord 1370

### Creating a dummy backend

Being in the backend section of the HAproxy configuration gui, create a new instance called “none”. We will use this backend later as our default destination as it’s actually doing nothing but being a placeholder for everything that does not match elsewhere.

Use the following settings:

	Mode: disabled
	Name: none
	Forwardto: address+port
	Address: 127.0.0.1
	Port: 80 (or any other port which does **not** listen on localhost)
	Health check method: none

Click on “save”.

### Setup SSL redirect on port 80

For convenience reasons you would normally want to setup a redirect from port 80 to 443.

First, create a backend:

	Mode: inactive
	Name: ssl-redirect
	Forwardto: address+port
	Address: 127.0.0.1
	Port: 8081 (or any other port which does not listen on localhost)
	Backend pass through: redirect scheme https code 301
	Health check method: none

Second, create the corresponding primary frontend:

	Name: WAN_HTTP
	Description: Redirect HTTP traffic to HTTPS
	Listen address: WAN address (IPv4)
	Port: 80
	SSL Offloading: no
	Backend server pool: ssl-redirect
	Type: HTTP / HTTPS(offloading)

That was easy.

### Creating the HTTPS frontend instance

Switch to the frontend section and create a new instance using the following settings:

	Name: WAN_HTTPS
	Description: HTTPS Reverse Proxy
	External address: localhost (IPv4)
	Port: 2043
	SSL Offloading: yes
	Advanced: accept-proxy npn http/1.1
	Backend Server Pool: none (or use any other webserver backend, e.g. to show custom error pages instead of 503)
	Type: HTTP / HTTPS(offloading)
	Client timeout: 7200000
	Use ‘forwardfor’ option: yes
	Advanced pass through:
	  # Remove headers that expose security-sensitive information.
	  rspidel ^Server:.*$
	  rspidel ^X-Powered-By:.*$
	  rspidel ^X-AspNet-Version:.*$
	  # add some security related headers
	  rspadd Content-Security-Policy: default-src https: data: 'unsafe-inline' 'unsafe-eval'
	  rspadd X-Frame-Options: SAMEORIGIN
	  rspadd X-Content-Type-Options: nosniff
	  rspadd X-Xss-Protection: 1; mode=block
	Certificate: Ideally choose a wildcard cert you uploaded to the Cert Manager before, e.g. from StartCom/StartSSL. We are choosing “*.example.com” here. Put additional certificates as required.
	Add ACL for certificate CommonName: No
	Advanced SSL options: no-sslv3

Click on “save”.

### Creating the HTTPS-Auth frontend instance

Back in the frontend overview, you may just clone the instance we just created by using the plus icon right next to that line. I will only describe what needs to be changed here:

	Name: WAN_HTTPS_auth
	Description: *.vpn.example.com (HTTPS Reverse Proxy with X.509 Auth)
	Port: 2044
	Certificate: *.vpn.example.com (this needs to be an official wildcard certificate!)
	Client verification CA certificates: Acmi VPN Remote Access (which we created before)

Note: You cannot link any CRL here at the beginning because even though you would have created it using the Cert Manager it’d be still empty at the beginning which HAproxy does not like. Add it here as soon as you actually have revoked any certificate.

### Creating the SSLH frontend instance

Now we create the third 2nd level frontend which will do SSH routing for us.

	Name: WAN_SSLH
	Description: *.ssh.example.com (SSL-secured SSH gateway with X.509 authentication)
	External address: localhost (IPv4)
	Port: 2022
	SSL Offloading: yes
	Advanced: accept-proxy npn ssh/2.0
	Backend Server Pool: none
	Type: SSL / HTTPS(TCP mode)
	Client timeout: 7200000
	Certificate: ssh.example.com (as created before)
	Add ACL for certificate CommonName: No
	Advanced ssl options: no-sslv3
	Client verification CA certificates: Acmi SSLH Gateway

### Creating the port 443 sharing main frontend instance

Now that you’ve come that far you cannot use any services yet due to the localhost listening we used before. We will change this here.

First, we need to create special backend services for each of the 2nd layer frontends so we can loop back to them from our 1st level frontend instance.

	Mode: active
	Name: OpenVPN
	Forwardto: address+port
	Address: 192.168.178.2 (basically your WAN IP running the OpenVPN instance)
	Port: 1194
	SSL: No
	Health check method: none
	Connect timeout: 3000
	Server timeout: 7200000
	Retries: 2

* * *

	Mode: active
	Name: WAN_HTTPS
	Forwardto: address+port
	Address: 127.0.0.1
	Port: 2043 (the port we used before for this frontend instance)
	SSL: yes
	Per server pass thru: send-proxy
	Health check method: none
	Server timeout: 7200000

* * *

	Mode: active
	Name: WAN_HTTPS_auth
	Forwardto: address+port
	Address: 127.0.0.1
	Port: 2044 (the port we used before for this frontend instance)
	SSL: yes
	Per server pass thru: send-proxy
	Health check method: none
	Server timeout: 7200000

* * *

	Mode: active
	Name: WAN_SSLH
	Forwardto: address+port
	Address: 127.0.0.1
	Port: 2022 (the port we used before for this frontend instance)
	SSL: yes
	Per server pass thru: send-proxy
	Health check method: none
	Server timeout: 7200000

After this, let’s finally create the main frontend instance:

	Name: WAN_443
	Description: Sharing port 443
	Shared Frontend: No
	External address: WAN address (IPv4)
	Port: 443
	SSL Offloading: No
	Backend Server Pool: none
	Type: TCP
	Client timeout: 7200000
	Advanced pass thru:
	  tcp-request inspect-delay 5s
	  tcp-request content accept if { req.ssl_hello_type 1 } or !{ req.ssl_hello_type 1 }

To route to the correct frontend, we will create a “shared frontend” for each of our 2nd level frontent (pfSense names it like this, actually this is simply additional configuration to the assigned primary frontend). So let’s create 4 shared frontends:

	Name: WAN_443_OpenVPN
	Description: OpenVPN
	Shared Frontend: Yes
	Primary Frontend: WAN_443
	Backend Server Pool: OpenVPN
	Access Control lists:
      NAME=acl EXPR=Custom NOT=yes VALUE=req.len 0
      NAME=acl EXPR=Custom NOT=yes VALUE=req.ssl_hello_type 1

* * *

	Name: WAN_443_HTTPS
	Description: HTTPS
	Shared Frontend: Yes
	Primary Frontend: WAN_443
	Backend Server Pool: WAN_HTTPS
	Access Control lists:
	  NAME=acl EXPR=Custom NOT=no VALUE=req.ssl_hello_type 1
	  NAME=acl EXPR=Custom NOT=yes VALUE=req.ssl_sni -m end -i .vpn.example.com
	  NAME=acl EXPR=Custom NOT=yes VALUE=req.ssl_sni -m end -i .ssh.example.com

* * *

	Name: WAN_443_HTTP_auth
	Description: *.vpn.example.com
	Shared Frontend: Yes
	Primary Frontend: WAN_443
	Backend Server Pool: WAN_HTTPS_auth
	Access Control lists:
	  NAME=acl EXPR=Custom NOT=no VALUE=req.ssl_hello_type 1
	  NAME=acl EXPR=Custom NOT=no VALUE=req.ssl_sni -m end -i .vpn.example.com

* * *

	Name: WAN_443_SSLH
	Description: *.ssh.example.com
	Shared Frontend: Yes
	Primary Frontend: WAN_443
	Backend Server Pool: WAN_SSLH
	Access Control lists:
	  NAME=acl EXPR=Custom NOT=no VALUE=req.ssl_hello_type 1
	  NAME=acl EXPR=Custom NOT=no VALUE=req.ssl_sni -m end -i .ssh.example.com

So much for the basic setup! But there is actually no server or web service available right now (beside OpenVPN which should be working right away now). This is what we are going to setup now. But oh wait, of course we obviously miss some DNS stuff so let’s shortly create these canonical name records in your DNS:

	_ssh.example.com. IN A <your-WAN-IP-address>
	vpn.example.com. IN A <your-WAN-IP-address>
	*.vpn.example.com. IN A <your-WAN-IP-address>

Should you be using a dynamic IP address for your WAN device you may also use CNAME records to your DynDNS provider’s name.

Okay, let’s finally start with the examples on how to make internal services available through your ultimate HAproxy setup now.

## Make public websites available via SSL offloading

Normal SSL offloading functionality is available creating shared frontends for each backend service an assign WAN_HTTPS as it’s primary frontend. You may just use the standard pre-defined expression for matching hostnames so route to specific backend web servers based on their URL (first create the backend, then create the secondary frontend). Put any server certificates in here as required.

You may also want to enable Strict-Transport-Security and Cookie protection here.

## Make internal websites available via SSL offloading

A lot of so called SSL-VPN appliances (e.g. Juniper) allow to granularly give access to internal websites without needing any VPN client software. In fact this is nothing else than some sophisticated reverse proxy and we can have pretty much same functionality (on top of the OpenVPN dial-in for more complex remote access requirements) using HAproxy and authentication via X509 user certificates.

The setup is exactly like with the public website described above, only difference is to assign WAN_HTTPS_auth as it’s primary backend.

For better convenience of this service we are using this wildcard certificate *.vpn.example.com together with wildcard DNS record so we can easily add additional backends without changing DNS or adding certs every time (of course this is still an option should you need a different URL, just takes more effort to set up).

Remember to import the user’s certificate and the public cert of your CA into his browser.

## Make internal servers console accessible via SSL-tunneled SSH

This is the one most of you will be interested in I guess so we’re finally here :-)

Obviously you need to create a new backend first:

	Name: ssh_server
	Mode: active
	Forwardto: Address+Port
	Address: <internal IP or DNS name>
	Port: 22
	SSL: no
	Health check: none
	Connection timeout: 3000
	Server timeout: 7200000
	Retries: 2

After it, let’s create the corresponding shared frontend:

	Name: WAN_SSLH_server
	Description: server.ssh.example.com
	Shared Frontend: yes
	Primary Frontend: WAN_SSLH
	Backend server pool: ssh_server
	Access Control lists:
	  NAME=acl EXPR=Custom VALUE=ssl_fc_npn -i ssh/2.0
	  NAME=acl EXPR=Custom VALUE=ssl_fc_sni_reg server.ssh.example.com

That’s it!

Optionally, you may add SSHFP records to your DNS based on server.ssh.example.com.

## SSH access examples

So, how you gonna access this server from external now? Basically it’s about using the ProxyCommand of your SSH client together with OpenSSL’s s_client command. This is pretty much forward for any Mac or Linux machine. For Windows dudes [this article](http://blog.chmd.fr/ssh-over-ssl-episode-4-a-haproxy-based-configuration.html) might be helpful but I will stay describing my Mac setup here.

Add these lines just once to your `~/.ssh/config` file:

	Host *.ssh.example.com
	ProxyCommand /usr/local/opt/openssl/bin/openssl s_client -verify 1 -verify_return_error -nextprotoneg ssh/2.0 -brief -quiet -servername %h -connect ssh.example.com:443 -CAfile ~/.ssh/sslh-ca.crt -cert ~/.ssh/sslh.crt -key ~/.ssh/sslh.key

If you’re like me, you also want a shortcut for your most used servers so you don’t need to enter the FQDN and user each time. This is still possible:

	Host server
	Hostname server.ssh.example.com
	User root

The ProxyCommand assumes you stored your CA public cert, your personal public cert and private key to `~/.ssh` to handle the X509 authentication which allows you to actually make use of the SSLH gateway (or even access to a specific server behind it as mentioned earlier).

Also note I am not using the openssl installation that comes with OS X but installed a newer version using [Homebrew](http://brew.sh/) because it gives you some more information and better encryption support. I’m also using Homebrew’s OpenSSH for better SSHFP support, see [this page](https://www.ohnekontur.de/2014/10/17/make-sshs-verifyhostkeydns-work-on-osx-as-it-should/).

Now you can simply SSH into `server.ssh.example.com` (or just `server`). Your connection will have strong SSL encryption which you can see directly from the connection output (it’s probably better than most single SSH connections as ECDSA often is not available due to outdated SSH server packages even on fairly new servers). Secondly you are using kind of 2-factor-authentication (first X509 cert + username + password or SSH key) to actually login which makes this a really secure way to access any server in your internal network from the outer world.

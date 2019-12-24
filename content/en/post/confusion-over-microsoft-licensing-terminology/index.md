---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Confusion Over Microsoft Licensing Terminology"
subtitle: "The way out of the jungle of Microsoft online services"
summary: "What are Microsoft online licenses, how are they constructed? This is a common question and it seems there is a huge gap about the definition in the online community. Sharing some thoughts about how to sort this out a bit."
authors: []
tags:
- Microsoft 365
- Office 365
- Azure AD
- Licensing
- License Management
- Identity Management
- Access Management
- IdM
- IAM
categories: [ "IT-Operations" ]
date: 2019-12-23T14:21:49+01:00
lastmod: 2019-12-24T11:21:49+01:00
featured: true
draft: false

#TODO remove this fix for ToC generation as soon as bug in Hugo 0.60+ was fixed
# see https://sourcethemes.com/academic/docs/writing-markdown-latex/#table-of-contents
markup: blackfriday

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: "Photo by Stephen Hocking on Unsplash"
  focal_point: "Smart"
  preview_only: false
  placement: 3

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

This fall I started working on a new customer project related to procurement and management of Microsoft online licenses.

When we started to discuss about the topic in more detail, the team and I quickly realized there was quite some different understanding about what licenses are and how all the components of it should be named. Naturally there were non-technicians involved as well, which retained their focus on the contractual and procurement parts. The management and departments had their feature-driven request concert defined as well, using yet another way to describe things and from different angles. Even though I've been working in that area for years, I was surprised how hard it was to explain this to my new stakeholders.

When we were looking into Microsoft documentation, reading through community blogs and stuff, we didn't get any clear answer that would really give us an absolute definition what Microsoft online licenses _really_ were, and how we could properly explain it to everyone inside and outside the team. It seemed extremely challenging to get a common understanding of the terminology. This didn't help for our research about the effective work we had to begin with.

{{% toc %}}

### Elementary questions

Have you ever had a conversation about what licenses one should buy to receive a particular feature in Office 365? Did you receive a question about what license would give you the best value? Did you get a task to help with cost optimisation? Have you ever tried to explain the differences between _Office 365 Enterprise license packages_, _Enterprise Mobility & Security license packages_, product names like _Azure Active Directory_, product licenses like _Azure Active Directory Premium (Plan 1)_, service plans like _Microsoft Azure Multi-Factor Authentication_, or service features like _Azure AD Privileged Identity Management_? Sometimes product licenses and service plans are even named the same (Oh hello, _Azure Active Directory Premium Plan 1_!). And as if that wasn't enough, Microsoft marketing is very good at promoting new features of existing services even as a completely new product. Not to forget about rebranding products regularly. Then there is the Azure Cloud Computing area as well – very easy to mix up stuff that is only partially related to the Microsoft 365 world. By the way when do you talk about _Microsoft 365_, and when about _Office 365_? What is all this E1, E3, E5 – or was it Enterprise E1, Enterprise E3, Enterprise E5? And where is E2 and E4?

Sounds familiar or did you even get confused yourself by now? Can you explain the connections, differences and similarities for a product, a license, a subscription, a package, a service, a plan, a feature, or a function? Don't worry, you're not alone. (And sorry for the rant).

The Microsoft world has become so complex to understand (and to keep up with), it is for a good reason some people do this as their full-time job. While I might not answer all questions here in every detail, I will try to give you some orientation to understand the relations so you know when to use which word correctly.

{{% alert %}}
Disclaimer: I am sharing my personal interpretation for many aspects I learned about during the last couple of years.  I am not saying I'm always having the right thoughts so if you came to a different result, you're very much welcome to let me know in the comments below.
{{% /alert %}}


### The way sales of online services work for Microsoft

First, you have to understand there is always two main aspects around Microsoft online licenses:

1. Activation
2. Distribution

Much of the terminology begins making sense when you remember that licenses are a way for Microsoft to control access to its online services for customers. This may sound far too simple, but in fact this is rarely in mind when talking about licenses. There were days when you maintained a piece of paper (called a product license) and that would simply legally qualify to use a product. Then shortly after there was the invention of a license product code that you had to enter into the application on a computer to prove that you had properly bought it from the manufacturer. Next, the application actually validated the product code online to restrict parallel installations. And so on and so on.

Especially for people outside of sales or for non-native speakers of English, this conscious link is frequently missing. Hint: I am not a native english speaker myself nor am I a sales person, so some aspects might be more than obvious to those who are.

While the _distribution_ aspect is totally non-technical, the actual _activation_ is almost only technical. Moreover, from R&D perspective, distribution comes after. When the product is there, this turns into the opposite because first you shall go to your distributor to purchase a license, then get access to the product. Again too simple, right?

The trick is to work out the overlaps of technical and non-technical aspects, to perceive how a service manifests as a selling product, and to remember how marketing and distribution work.
To me, there is additionally some devil in the detail about the differences between products, services, and features (function is just a synonym that might be interchangeable.).

### Activation

#### What is a _feature_? What is a _service_? What is a service _plan_?

Let's start to explain the origin of everything: The online service itself.

Logically, one or many features are part of a service. People familiar with [IT service management](https://en.wikipedia.org/wiki/IT_service_management) (aka ITSM) remember this as they do a similar thing when they define their (internal) IT service. The difference is that for internal IT, they often are combining different pre-existing products (often from different vendors) into a single IT service in order to have a single entity to manage. Technically you could also describe this as _system integration_.

Being a service provider for their own products, Microsoft does the same thing when developing new features and making them available to their customers:

Features of a service are combined into at least one _service **plan**_. A _plan_ represents a set of features to be available to the user in a specific online _service_. This means the service plan is actually part of the user authorization process to access and use certain features within a service. It also means that during development of a feature, access management is already taken into consideration on a quite granular level (well, let's ignore all the burden of the legacy on-premises world that still sits deep into some products whose names shall be unspoken aloud…).

Note: You should not mix up the words _service plan_ and _license plan_ because it is not the same. Sharing some lessons learned, it is a clever idea to imagine there is no such thing like a _license_ plan. When you use it, most people will not know right away to which level of the whole licensing story you are referring to. Simply minimize such misunderstandings.
The term _license_ is completely irrelevant here and will be explained later. Whenever you talk about a _plan_, it should essentially refer to a _service plan_ which is basically about activation of a service with a specific set of features to an end user. It is not about how you get such service plan available into your tenant or about license compliance.

**Multiple service plans**

Depending on how Microsoft wants to make money or promotion, not all features will be put into the same service plan. There could be a basic service plan consisting only 3 of 10 available features. Then there might be a premium service plan, consisting the 3 features of the basic service plan and adding 4 additional cool features. Maybe there is still 3 superior premium features left so those are again being added to another service plan to represent the full feature set of the service. In rare cases there might also be a technical or security reason to have separate service plans. For example, it might be the only way for the customer itself to control end user access because the service lacks some advanced access control (e.g. it is unable to validate for correct group membership of a user.).

There is a typical pattern that Microsoft frequently uses to distinguish such expanding service plans by simply adding _Plan 1_, _Plan 2_, _Plan 3_ (and so on) to the end of the service plan name.

An imaginary example:

````plaintext
SERVICE NAME
  │
  └─── SERVICE NAME Plan 1
  │       - Feature 1
  │       - Feature 2
  │       - Feature 3
  │
  └─── SERVICE NAME Plan 2
  │       - Feature 1
  │       - Feature 2
  │       - Feature 3
  │       - Feature 4
  │       - Feature 5
  │       - Feature 6
  │       - Feature 7
  │
  └─── SERVICE NAME Plan 3
  │       - Feature 1
  │       - Feature 2
  │       - Feature 3
  │       - Feature 4
  │       - Feature 5
  │       - Feature 6
  │       - Feature 7
  │       - Feature 8
  │       - Feature 9
  │       - Feature 10
````

A practical example for this would be the Azure Active Directory service: There is a basic plan free of charge, and there are two paid premium plans.

What you can note from this particular example as well is, that the free plan does not start with a name Plan 1, the free plan is simply called Basic. For other services however, even the free service plan starts with a name of Plan 1. It is sometimes inconsistently named, in particular when looking behind the marketing facade. What you can see there is that service plans are created very early in the process, and as they got an internal name that – due to technical limitations – can not be changed thereafter anymore, it is pretty obvious that the selling aspect is still undefined at that point in time. Naturally there is a display name that can be changed later on to better fit into the marketing machinery and this display name quite often is completely different. Indeed, it is very fascinating to sneak around in the technical details because there is so much to make conclusions from it. Somebody familiar with the matter might ask "Why are they using a fixed name, why are they not using a random universally unique identifier ([UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)) like everyone else does?". In fact, this is what Microsoft has started to do now in parallel for newer implementations. However, it seems they can't get rid of the textual identifiers quite soon and probably never will, so they will just stay in parallel for compatibility reasons.

Another pattern I identified is that when it comes to some enhanced security features, there is often a Plan 1 for monitor-only or manual control/operation. Then there is a Plan 2 which will allow you to automate stuff, provide active help for end users, or bring some intelligence into the game and provide useful benefits for your IT governance. This is not only valid for Azure Active Directory, but for example also _Cloud App Security_ (CAS) and _Microsoft Information Protection_ (MIP, in progress to be renamed from Azure Information Protection, AIP).

**Dependant service plans**

Service plans sometimes are defined inconsistently. It doesn't always matter if you have enabled or disabled a Plan 1 when you have a Plan 2 enabled for the user already. However, it might also be that Plan 2 was defined as some kind of an add-on service plan that in fact requires the features that Plan 1 will enable. It is hard so foresee such hard dependencies because they are not always evident. Sometimes a plan is a replacement for another, or it can be a supplementary plan. This very much depends on the service and the feature as well. There is no general rule as of today.

As a general rule of a thumb, you should always enable Plan 1 before you enable a Plan 2 of the same service. That way you're on the safe side (with some exceptions, see _Service plan conflicts_ below.).

In some cases, there can also be dependant service plans that seem to be totally unrelated. For example, MyAnalytics is actually an Exchange Online feature but is often not seen as being part of Exchange Online. This is also caused by the fact that you cannot purchase MyAnalytics as a single license, it only comes with Office 365 E5 or Microsoft 365 E5. It becomes more obvious if you go down to it on a technical level where you can implicitly assume this, based on internal names that Microsoft is using (e.g. see [Product names and service plan identifiers for licensing](https://docs.microsoft.com/azure/active-directory/users-groups-roles/licensing-service-plan-reference)).

**Service plan conflicts**

Depending on how a particular service works, there can also be conflicting service plans for it. [Typical examples](https://docs.microsoft.com/azure/active-directory/users-groups-roles/licensing-groups-resolve-problems#conflicting-service-plans) are service plans for SharePoint Online and Exchange Online. These services are unable to merge multiple service plans into a superset of features they ultimately apply to the end user, especially not when there is multiple product licenses involved and many include a service plan for the same service.

This can happen if you assign multiple licenses to the same user. For example, if you are dealing with Project Online or Dynamics 365 licenses, they will bring their own service plan for SharePoint Online Plan 2. This is to ensure users have the full feature set of SharePoint Online available in order to work with the Dynamics platform, even though they otherwise might only have a very basic license like for frontline workers (F1) or even no other license at all. In that case, the inferior SharePoint Online service plan needs to be disabled first so that the full service plan can be enabled.

For those interested, there is a list available from Microsoft [here](https://docs.microsoft.com/azure/active-directory/users-groups-roles/licensing-service-plan-reference#service-plans-that-cannot-be-assigned-at-the-same-time).

**Ineffective service plans with tenant-level features**

There are quite many features that once you have a service plan enabled for only a particular user, the feature becomes available to everyone. It does not matter anymore whether you had assigned a product license with a corresponding service plan to a user, or if you had even enabled such service plan. The reasons for such incomplete license handling are undoubtedly very divers; I personally think it is mostly due to time-to-market aspects.

Great, you might think, but in fact your license compliance obligation still matters. It has just become your own objective to restrict access to as many users as you have appropriate licenses available in your tenant. Microsoft describes more about such services [here](https://docs.microsoft.com/office365/servicedescriptions/microsoft-365-service-descriptions/microsoft-365-tenantlevel-services-licensing-guidance/microsoft-365-tenantlevel-services-licensing-guidance).

Fortunately, most services or features can be restricted to specific group membership only. However, it rapidly becomes a nightmare to manage for more global organisations. It even becomes worse when you realize that Microsoft might subsequently introduce real service plans for such services over time where you had features available to users who suddenly disappear for them. If you had ignored the risk of an audit and being noncompliant before, at least be sure to be properly prepared for a huge wave of complains at your 1st level IT support.

Proper management of change as part of IT governance processes has become key to effectively and efficiently prevent such costly occurrences.

### Distribution

#### What is a _product_ or _product name_? What is a _product variant_? What is a _pack_ or _package_?

Let's put ourselves in the position of a marketing and sales person. The software department has completed a new service, and it will now become your _product_.
Before it can actively be sold to the market, you have to become creative to invent a story line that will support you to properly explain it to potential customers. This is where it starts differentiating between a _service_ and a _product_: A _service_ is what you are delivering, a _product_ is what you are offering to deliver the service later on. Sounds hairsplitting? Almost.

A product is _defined_, _designed_ and _formed_ precisely to support the whole line of distribution. You transfer the services that you have and shape a product out of it that will greatly help you to make the most money out of it. Consequently all you need to do is to invent a fancy _product name_, right? Not quite.

For most of the services, Microsoft is selling different _product variants_ that will provide different feature sets to you, depending on how much you are willing to spend. Are you connecting the dots to the service plans from above already? Great, this is what they have been developed for in the first place.

Sales people might often use the term _Stock Keeping Unit_ (SKU) which simply refers to a particular product variant. It has actually also become a technical term because during implementation of the product variant as a product license with service plans, Microsoft programmers had make use of that same term to describe what they are implementing. This is why a lot of tech discussions on the internet will also use SKU but in fact they are talking about a service plan. Sometimes for tech people SKU is even a unique identifier of the service plan, but most of the time they won't tell you which identifer exactly (remember there is a textual identifier and a UUID?). You always have to imply this from the context and this is why doing research on the internet about Microsoft licenses is so exhausting.

Reasonably often, there is a direct 1-to-1 relationship between a product variant and a service plan. Both then actually mean the identical thing, just one is the non-technical term, the other is the technical term.

Following our imaginary example about a service plan structure from above, this looks extremely similar for a product and its variants:

````plaintext
PRODUCT NAME
  │
  └─── PRODUCT NAME, variant 1
  │       - Feature 1
  │       - Feature 2
  │       - Feature 3
  │
  └─── PRODUCT NAME, variant 2
  │       - Feature 1
  │       - Feature 2
  │       - Feature 3
  │       - Feature 4
  │       - Feature 5
  │       - Feature 6
  │       - Feature 7
  │
  └─── PRODUCT NAME, variant 3
  │       - Feature 1
  │       - Feature 2
  │       - Feature 3
  │       - Feature 4
  │       - Feature 5
  │       - Feature 6
  │       - Feature 7
  │       - Feature 8
  │       - Feature 9
  │       - Feature 10
````

**Upselling and reduction of prices**

Once you realize which product variants matter most to your customers, you start thinking about how you could sell even more to them. This is called upselling and essentially what you are attempting to achieve is to make your customers using more and more of your services and advanced features.

Microsoft has defined unique products that I would describe as virtual products because they don't have a 1-to-1 relationship to a single service plan anymore. Instead, it is a bundle of many single products that Microsoft then calls a _package_ (short: _pack_). Clearly it makes sense to spend less money on the package than what you would need to spend for getting all the single licenses. To make packages even more attractive, there are sometimes services or features that can not be purchased as a single product (for example: MyAnalytics). In my opinion, this exclusive bundling often just complicates decision makings.

If you practically got a mental breakdown because of all the different single products and all their product variants before, a package should then appear to you as your sheet anchor. Microsoft wants to make it easy for you (and your mental health) to go for a package instead of just one or two single products. Indeed, after considering only 2 or 3 single products, some packages become already cheaper and will also allow you access to additional services you didn't actually consider in the first place.

However, of course there can be different variants of such a package again.

To remain things abstract with our imaginary example, a complete _package family_ would now finally look quite a bit different:

````plaintext
PACKAGE NAME
  │
  └─── PACKAGE NAME, variant 1
  │       └─── Product Name 1, variant 1
  │       │       - Feature 1
  │       │       - Feature 2
  │       │       - Feature 3
  │       └─── Product Name 2, variant 1
  │       │       - Feature 1
  │       │       - Feature 2
  │       │       - Feature 3
  │       └─── Product Name 3, variant 1
  │               - Feature 1
  │               - Feature 2
  │               - Feature 3
  │
  └─── PACKAGE NAME, variant 2
  │       └─── Product Name 1, variant 2
  │       │       - Feature 1
  │       │       - [...]
  │       │       - Feature 7
  │       └─── Product Name 2, variant 2
  │       │       - Feature 1
  │       │       - [...]
  │       │       - Feature 7
  │       └─── Product Name 3, variant 2
  │               - Feature 1
  │               - [...]
  │               - Feature 7
  │
  └─── PACKAGE NAME, variant 3
  │       └─── Product Name 1, variant 3
  │       │       - Feature 1
  │       │       - [...]
  │       │       - Feature 10
  │       └─── Product Name 2, variant 3
  │       │       - Feature 1
  │       │       - [...]
  │       │       - Feature 10
  │       └─── Product Name 3, variant 3
  │       │       - Feature 1
  │       │       - [...]
  │       │       - Feature 10
  │       └─── Product Name 4
  │               - Feature 1
````

Did you already have candidates for packages in your mind? If you had thought about _Enterprise Mobility & Security_ or _Microsoft 365_, you're exactly right!

Congratulations if you had also thought about _Office 365_ being a package. Office 365 is likely the most misunderstood brand name ever. As you can see, it does not only describe a whole platform; it can also be interpreted as a licensing model. Not to mention all confusion between Office 365, Office ProPlus, and Office Online ([What is Office?](https://www.youtube.com/watch?v=QmJSPN7jLFw&feature=share)).

Needless to say, when Microsoft was first designing their new online services almost a decade ago, offering a _package_ and naming it _Office 365_ was all about it. There were even different package variants available already then. Have you read about _Office 365 Enterprise E1_ and _Office 365 Enterprise E2_? Here you go, those are the package variants!

However, these days Microsoft has removed _Enterprise_ from the package names because essentially this is what the _E_ in _E1_ or _E2_ already represents. In fact, the E-_x_ notation became so popular and well known that you can detect this on a whole lot of other packages that Microsoft offers for enterprise customers, not just Office 365. We also got other variants for Small, Medium, and Mid-sized organisations. As those companies typically know they are not enterprise and often don't even want to be seen as such, product variants for those companies seem to avoid to include the term "enterprise", even the E-_x_ notation. Currently, all non-enterprise offerings are simplified to just be named _Business_, likely because all the choices between small, medium, and mid-sized was moderately overwhelming for companies that simply don't have to deal with their IT that much.

Wait, did I just say _Office 365 E**2**_? You got me; this package variant is not for sale anymore and got replaced by _Office 365 E3_. As you might have guessed, it is the same situation for _Office 365 E4_ which got replaced by _Office 365 E5_ some time ago. Now you even know the secret why you might have thought that Microsoft can't count from 1 to 5… makes sense now? And finally you also know why there is packages like _Enterprise Mobility & Security E3_ and _Enterprise Mobilits & Security E5_, or _Microsoft 365 E3_ and _Microsoft 365 E5_, but no E1, E2, E4 variants at all: It is simply coming from the success of the Office 365 package variants where it all started with. You can't blame the marketing guys to just continue with what seems familiar to a lot of people already, can you?

Did you already notice that for newer package variants, there is also the letter _F_ involved instead of _E_? F is for frontline workers, meaning it is a bundle of services with their lowest feature set. What you will see here is that service plans that come with such package variant will often include the term _kiosk_ (or even just _K1_) which expresses that the service can only be used in a web browser. Fortunately Microsoft has realized that frontline workers often are not using a desktop PC anymore but are equipped with mobile devices like smartphones or even tablets. Restricting access to a web browser only for these devices is quite inconvenient so access options were now extended to Microsofts mobile apps for those kind of package variants. The term _kiosk_ now seems a bit outdated but you might still face it here and there, knowing that it is not just a kiosk desktop computer in the lobby anymore.

#### What is the connection between all the different package families?

If you wonder how Microsoft had come up with all the different packages and what their (potential) history was, I am now sharing some of my own thoughts. If you are doing research on the internet and any of the legacy package names will cross your way, you should be able to put it in better perspective. (This might be the part now where I mainly do glass balling… you have been warned.)

**Office 365 (O365)**

These are the essential packages you will always consider to purchase in one or more variants, depending on how many different use cases you have. I don't remember any customer that would actually buy single product licenses for a majority of its user base. Only for some edge use cases, customers would purchase additional single product licenses in order to supplement a small group of users with some distinctive features they require to have.

**Enterprise Mobility & Security (EMS)**

Actually, this name is a bit misleading as it should also contain something like _Identity Management_, _Governance_, or _Compliance_. An absolutely essential and useful product variant that will help you with this comes with this package and is called _Azure Active Directory **Premium**_. Indeed, Microsoft should have placed this as part of the Office 365 packages. They did not for a legitimate (selling) reason: You should either purchase the single product license on top of your Office 365 package, or you should start realizing this is almost half of the price of an EMS E3 package already.

Also, both buzzwords _Mobility_ and _Security_ likewise are extremely important nowadays. Users need to be flexible and work mobile almost always. This in turn triggers increased need for security protection, not to mention all regulatory and contractual requirements that have increased so much. In fact those requirements have become so high even smaller organisations have to think what they are doing to get a basic level of data loss prevention against unintentional data leaks, and to ensure data privacy for every user (yes, it is this nasty acronym GDPR I am referring to.).

**Enterprise Cloud Suite (ECS) - _DEPRECATED_**

As many enterprise customers were buying both packages _Office 365_ and _Enterprise Mobility & Security_ already, they have asked a lot about the still missing piece of Windows 10 being an integrated part of Microsofts cloud. So in 2015, Microsoft introduced a new package consisting of _Office 365 E3_ + _Enterprise Mobility & Security E3_ + _Windows 10 Enterprise E3_. They named it _Enterprise Cloud Suite_. Adding the enterprise edition of Windows to this was mainly about license optimisation at that time so the benefits were mainly by financials or had improved IT operational aspects.

**Secure Productive Enterprise (SPE) - _DEPRECATED_**

With the introduction of an E5 package variant in 2016, Microsoft renamed their _Enterprise Cloud Suite_ into _Secure Productive Enterprise_ (spoiler alert: It didn't last really long…).

At that time, Microsoft introduced new Advanced Threat Protection features in Windows Defender and as cloud security topics started to become important for a broader enterprise audience, it seemed legit to point out the additional security benefits that you would not get from an EMS package.

It might even have been moderately too early for such package. Increased endpoint protection requirements on mobile clients, because they were no longer secured by network firewalls and stuff, was something that wasn't on everyones list just yet.

**Microsoft 365 (M365)**

In 2017, not even one year after Microsoft had renamed their _Secure Productive Enterprise_ package, it got renamed again into _Microsoft 365_. While all the renaming series seemed pretty annoying, I think this is a fairly good match now – _Microsoft 365_ is indeed what the name indicates to be: Every service that Microsoft has to offer for enterprise customers (Office 365 Enterprise + Enterprise Mobility & Security + Windows 10 Enterprise) in a single package. To be fair: The package does not contain the basic Windows 10 license, it solely consists of the Enterprise supplementary license to upgrade a PC with an existing Windows 10 Home or Professional license to Windows 10 Enterprise. This is confusing, I know…

It only just starts making sense when you look at the way Microsoft has re-designed their Mobile Device Management solution _Intune_ and the integration into Azure Active Directory: Bring-Your-Own-Device scenarios with lots of self-service play a major role here, and it can go that far that with [Windows Autopilot](https://www.microsoft.com/microsoft-365/windows/windows-autopilot), you can have your hardware partner of choice send a blank notebook PC to your user and it will simply be onboarded to your company environment by a web login of the user during the Out-Of-Box-Experience setup run – no IT department involved at all. The user could even go to a tech store nearby and buy (almost) whatever PC s/he wants. It is assumed that such devices are always equipped with a Windows 10 Home or Professional license already (the product key is stored to the firmware of the device nowadays.). The user would then kind of bring his own Windows Enterprise license as an upgrade onto that device (in fact, the user could perform this on multiple of his devices.). This is efficient because IT is then able to make use of all the advanced enterprise management features that most users would expect by a managed device.

### Purchase and enable

#### What is a _license_ or _product license_? What is a _subscription_?

You made it until here to finally learn what a license _really_ is? Awesome, here you go!

To be very precise, a _product license_ is what you get in return when you had purchased a product. Again so smart to say this, I know… The point is, that a _product license_ is now actually connecting the two worlds of marketing and sales on one site, and the technical enablement on the other site. So in marketing speech, a product license might be the same as what we defined as a _product variant_ or _package variant_ above. In technical terms, a product license is bringing the actual _service plans_ into your tenant so that you can assign those to your users. All clear?

As you can see, you should mind the audience you are currently talking to about licenses. You might always talk about the similar thing but with different aspects. If you are a technician talking to your procurement guy, remember understanding the word _license_ in a purchasing context. If you are a procurement person having a little chat to your IT department, remember a license comes with quite some technical details for the implementation and even limitations and own requirements.

The way you purchase a product license is that you actually sign a subscription contract for either 1 or 12 month while for the latter you may choose between a one-time and monthly payment. This is exceptionally attractive for both, Microsoft and customers: There is constant revenue for Microsoft with easy forecasts to be made. As a customer, you get rid of all the complex methods of settlement for your internal IT costs (Okay, almost.), and services will scale very flexible for your business needs. Plus, this allows for fast and continuos improvements of the services (Agreed, it could be faster most of the time, but you get the point.) so you as the customer will only need to make baby steps every other month to adapt; no more huge and costly migration and transformation project every 5 (or 10… 15?) years. The subscription model in fact has so many benefits and is so much different, it is absolutely impossible to do a proper comparison with the classical self-hosted approach of the last decades before. Are you still wondering about the success of Microsoft these days?

Last but not least, sometimes people talk about a _User Subscription License_ (USL). What they are likely referring to is again a product license, but probably a license out of the pool that you have already available in your tentant ready for user assignment. I wouldn't rely on people being consciously so picky and actually make a difference between a product license that you plan to buy, and a product license that you had purchased already. You better ask twice if the exact circumstance is crucial for you.

**Actual representation of a product license in your tenant**

Our abstract examples from above seem so well structured, right? It is nice to have the tree structure until all the way down, correct? Yes, easy to understand after explaining it to you.

The disappointment starts when you get back into your Office 365 tenant and look for what you can actually see there: It is a simple list of all the licenses you bought. If you bought multiple variants of the same product, they would just stand next to each other. What happened is that our explanatory structure got flattened to only serve the technical need to enable a service for users. Without all the explanation from above, you would certainly not be able to understand what this all means. Now you know better.

````plaintext
PACKAGE NAME, variant 1
  │
  └─── SERVICE NAME 1, Plan 1
  │       - Feature 1
  │       - Feature 2
  │       - Feature 3
  │
  └─── SERVICE NAME 2, Plan 1
  │       - Feature 1
  │       - Feature 2
  │       - Feature 3
  │
  └─── SERVICE NAME 3, Plan 1
          - Feature 1
          - Feature 2
          - Feature 3

PACKAGE NAME, variant 2
  │
  └─── SERVICE NAME 1, Plan 2
  │       - Feature 1
  │       - Feature 2
  │       - Feature 3
  │
  └─── SERVICE NAME 2, Plan 2
  │       - Feature 1
  │       - Feature 2
  │       - Feature 3
  │
  └─── SERVICE NAME 3, Plan 2
          - Feature 1
          - Feature 2
          - Feature 3

PRODUCT NAME, variant 1
  │
  └─── PRODUCT/SERVICE NAME, Plan 1
          - Feature 1
          - Feature 2
          - Feature 3

PRODUCT NAME, variant 2
  │
  └─── PRODUCT/SERVICE NAME, Plan 1
  │       - Feature 1
  │       - Feature 2
  │       - Feature 3
  │
  └─── PRODUCT/SERVICE NAME, Plan 2
          - Feature 1
          - Feature 2
          - Feature 3
````

From a technical standpoint, the flattened structure makes a lot of sense. Well, technicians wish they could even get rid of the topmost layer, representing the product license, and just assign service plans directly to their users. That would really be helpful to easily manage user provisioning sometimes but of course, it makes a little sense to stay with what you had essentially bought in the first place.

Eventually, the product license (don't say plan… right?) is what you need to assign to a user first to control what service plans of that license are enabled for the user. It is a trivial task unless you start using more services than what is included into a certain license, and when you need to optimise your costs. Assigning licenses to groups and working with group memberships instead helps for many cases (see GBL, [group-based licensing](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-licensing-whatis-azure-portal)). Besides the fact that for this feature, you (of course) need to have an Azure AD Premium license, it is not the answer of everything. Also mid-sized and maybe even small organisations have an extended need to properly govern their licenses, e.g. to integrate into corporate Identity Management (IdM) systems and automate the whole lifecycle management of user identities. Making the right use of GBL and transferring it into the right architecture to make the orchestral sound great is not an easy task at all.

Good luck the next time you come into contact with Microsoft online licenses.

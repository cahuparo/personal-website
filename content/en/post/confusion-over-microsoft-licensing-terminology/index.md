---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Confusion Over Microsoft Licensing Terminology"
subtitle: "The way out of the jungle of Microsoft online licenses"
summary: "What are Microsoft online licenses, how are they constructed? This is a common question and it seems there is a huge gap about the definition in the online community. Sharing some thoughts about how to sort this out a bit."
authors: []
tags:
- Microsoft 365
- Office 365
- Azure AD
- Licensing
categories: [ "IT-Operations" ]
date: 2019-12-22T13:09:49+01:00
lastmod: 2019-12-22T13:09:49+01:00
featured: true
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: "Smart"
  preview_only: false
  #placement: 3

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

This fall I started to work on a new customer project related to procurement and management of Microsoft online licenses.

When we started to discuss about the topic in more detail, the team and I quickly realised that there was quite some different understanding about what licenses are and how all the components of it should be named. Of course there were non-technicians involved as well, which had their focus on the contractual and procurement parts. The management and departments had their feature-driven request concert defined as well, using yet another way to describe things and from different angles. Even though I've been working in that area for years, I was surprised how hard it was to explain this to my new stakeholders.

When we were looking into Microsoft documentation, reading through community blogs and stuff, we didn't get any clear answer that would really give us a final definition what Microsoft online licenses _really_ were, and how we could properly explain it to everyone inside and outside the team. It seemed extremely difficult to obtain a common understanding of the terminology. This didn't help for our research about the actual work we had to begin with.

### Elementary questions

Have you ever had a conversation about what licenses one should buy to receive a particular feature in Office 365? Did you receive a question about what license would give you the best value? Did you get a task to help with cost optimization? Have you ever tried to explain the differences between _Office 365 Enterprise license packages_, _Enterprise Mobility & Security license packages_, product names like _Azure Active Directory_, product licenses like _Azure Active Directory Premium (Plan 1)_, service plans like _Microsoft Azure Multi-Factor Authentication_, or service features like _Azure AD Privileged Identity Management_? Sometimes product licenses and service plans are even named the same (Oh hello, _Azure Active Directory Premium Plan 1_!). And as if that wasn't enough, Microsoft marketing is very good at promoting new features of existing services even as a completely new product. Not to forget about rebranding products regularly. Then there is the Azure Cloud Computing area as well – very easy to mix up stuff that is only partially related to the Microsoft 365 world. By the way when do you talk about _Microsoft 365_, and when about _Office 365_? What is all this E1, E3, E5 – or was it Enterprise E1, Enterprise E3, Enterprise E5? And where is E2 and E4?

Sounds familiar or did you even get confused yourself by now? Can you explain the connections, differences and similarities for a product, a license, a subscription, a package, a service, a plan, a feature, or a function? Don't worry, you're not alone. (And sorry for the rant).

The Microsoft world has become so complex to understand (and to keep up with), it is for a good reason some people do this as their full-time job. While I might not answer all questions here in every detail, I will try to give you some orientation to understand the relations so you know when to use which word correctly.

### The way sales of online services work for Microsoft

First, you have to understand that there is always two main aspects around Microsoft online licenses:

1. Activation
2. Distribution

Much of the terminology begins to make sense when you remember that licenses are a way for Microsoft to control access to its online services for customers. This may sound far too simple, but in fact this is rarely in mind when talking about licenses. There were days when you had a piece of paper (called a license) and that would simply legally qualify to use a product. Then shortly after, there was the invention of a license product code that you had to enter into the application on a computer to prove that you had properly bought it from the manufacturer. Next, the application actually validated the product code online to restrict parallel installations. And so on and so on.

Especially for people outside of sales or for non-native speakers of English, this conscious link is often missing. Hint: I am not a native english speaker myself nor am I a sales person, so some aspects might be more than obvious to those who are.

While the _distribution_ aspect is totally non-technical, the actual _activation_ is almost only technical. Also, from R&D perspective, distribution comes after. When the product is there, this turns into the opposite because first you shall go to your distributor to buy a license, then get access to the product. Again too simple, right?

So the trick is to work out the overlaps of technical and non-technical aspects, to understand how a service manifestates as a selling product, and to remember how marketing and distribution work.
To me, there is also some devil in the detail about the differences between products, services, and features (function is just a synonym that might be interchangeable).

### Activation

#### What is a _feature_? What is a _service_? What is a service _plan_?

Let's start to explain the origin of everything: The online service itself.

Logically, one or many features are part of a service. People familiar with [IT service management](https://en.wikipedia.org/wiki/IT_service_management) (aka ITSM) remember this as they do a similar thing when they define their (internal) IT service. The difference is that for internal IT, they often are combining different pre-existing products (often from different vendors) into a single IT service in order to have a single entity to manage. Technically you could also describe this as _system integration_.

Being a service provider for their own products, Microsoft does the same thing when developing new features and making them available to their customers:

Features of a service are combined into at least one _service **plan**_. A _plan_ represents a set of features to be available to the user in a specific online _service_. This means that the service plan is actually part of the user authorization process to access and use certain features within a service. It also means that during development of a feature, access management is already taken into consideration on a quite granular level (well, let's ignore all the burden of the legacy on-premises world that still sits deep into some products whose names shall not be spoken aloud…).

Note: You should not mix up the words _service plan_ and _license plan_ because it is not the same. Sharing some lessons learned, it is a good idea to think that there is no such thing like a _license_ plan. When you use it, most people will not immediately know to which level of the whole licensing story you are referring to. Simply avoid such missunderstandings.
The term _license_ is completely irrelevant here and will be described later on. Whenever you talk about a _plan_, it should actually refer to a _service plan_ which is basically about activation of a service with a specific set of features to an end user. It is not about how you get such service plan available into your tenant or about license compliance.

**Multiple service plans**

Depending on how Microsoft wants to make money or promotion, not all features will be put into the same service plan. There could be a basic service plan consisting only 3 of 10 available features. Then there might be a premium service plan, consisting the 3 features of the basic service plan and adding 4 additional cool features. Maybe there is still 3 superior premium features left so those are again being added to another service plan to represent the full feature set of the service. In rare cases there might also be a technical or security reason to have separate service plans. For example, it might be the only way for the customer itself to control end user access because the service lacks some advanced access control (e.g. it is not able to validate for correct group membership of a user).

There is a common pattern that Microsoft often uses to distinguish such expanding service plans by simply adding _Plan 1_, _Plan 2_, _Plan 3_ (and so on) to the end of the service plan name.

An imaginary example:

````markdown
SERVICE NAME
│
└─── SERVICE NAME Plan 1
│        - Feature 1
│        - Feature 2
│        - Feature 3
└─── SERVICE NAME Plan 2
│        - Feature 1
│        - Feature 2
│        - Feature 3
│        - Feature 4
│        - Feature 5
│        - Feature 6
│        - Feature 7
└─── SERVICE NAME Plan 3
         - Feature 1
         - Feature 2
         - Feature 3
         - Feature 4
         - Feature 5
         - Feature 6
         - Feature 7
         - Feature 8
         - Feature 9
         - Feature 10
````

A practical example for this would be the Azure Active Directory service: There is a basic plan free of charge, and there are two paid premium plans.

Another pattern I identified is that when it comes to some enhanced security features, there is often a Plan 1 for monitor-only or manual control/operation. Then there is a Plan 2 which will allow you to automate stuff, provide active help for end users, or bring some intelligence into the game and provides useful benefits for your IT governance. This is not only true for Azure Active Directory, but for example also _Microsoft Information Protection_ (MIP, in progress to be renamed from Azure Information Protection, AIP) and _Cloud App Security_ (CAS).

**Dependant service plans**

Service plans are not always defined consistently. Sometimes, it doesn't matter if you have enabled or disabled a Plan 1 when you have a Plan 2 enabled for the user already. However, it might also be that Plan 2 was defined as some kind of an add-on service plan that actually requires the features that Plan 1 will enable. It is hard so foresee such hard dependencies because they are not always obvious. So, sometimes a plan is a replacement for another or it can be a supplementary plan. This very much depends on the service and the feature as well. There is no general rule as of today.

As a general rule of a thumb, you should always enable Plan 1 before you enable a Plan 2 of the same service. That way you're on the safe side (with some exceptions, see _Service plan conflicts_ below).

In some cases, there can also be dependant service plans that seem to be totally unrelated. For example, MyAnalytics is actually an Exchange Online feature but is often not seen as being part of Exchange Online. This is also caused by the fact that you cannot purchase MyAnalytics as a single license, it only comes with Office 365 E5 or Microsoft 365 E5. It becomes more onvious if you go down to it on a technical level where you can implicitly assume this, based on internal names that Microsoft is using (e.g. see [Product names and service plan identifiers for licensing](https://docs.microsoft.com/azure/active-directory/users-groups-roles/licensing-service-plan-reference)).

**Service plan conflicts**

Depending on how a particular service works, there can also be conflicting service plans for it. [Typical examples](https://docs.microsoft.com/azure/active-directory/users-groups-roles/licensing-groups-resolve-problems#conflicting-service-plans) are service plans for SharePoint Online and Exchange Online. These services are not able to merge multiple service plans into a superset of features they ultimately apply to the end user, especially not when there is multiple product licenses for the same user.

This can happen if you apply multiple licenses to the same user. For example, if you are dealing with Project Online or Dynamics 365 licenses, they will bring their own service plan for SharePoint Online Plan 2. This is to ensure that users have the full feature set of SharePoint Online available in order to work with the Dynamics platform, even though they otherwise might only have a very basic license like for frontline workers (F1) or even no other license at all. In that case, the inferior SharePoint Online service plan needs to be disabled first so that the full service plan can be enabled.

For those interested, there is a list available from Microsoft [here](https://docs.microsoft.com/azure/active-directory/users-groups-roles/licensing-service-plan-reference#service-plans-that-cannot-be-assigned-at-the-same-time).

**Ineffective service plans with tenant-level features**

There are quite many features that once you have a service plan enabled for only a single user, the feature becomes available to everyone. It does not matter anymore whether you had assigned a product license with a corresponding service plan to a user, or if you had even enabled such service plan. The reasons for such incomplete license handling are certainly very divers; I personally think it is mostly due to time-to-market aspects.

Great, you might think, but in fact your license compliance obligation still matters. It has just become your own objective to restrict access to as many users as you have appropriate licenses available in your tenant. Microsoft describes more about such services [here](https://docs.microsoft.com/office365/servicedescriptions/microsoft-365-service-descriptions/microsoft-365-tenantlevel-services-licensing-guidance/microsoft-365-tenantlevel-services-licensing-guidance).

Fortunately, most services or features can be restricted to specific group membership only. However, it quickly becomes a nightmare to manage for larger organizations. It even becomes worse when you realize that Microsoft might subsequently introduce real service plans for such services over time where you had features available to users which suddenly disappear for them. If you had ignored the risk of and audit and being noncompliant before, at least be sure to be well prepared for a huge wave of complains at your 1st level IT support.

Proper management of change as part of IT governance processes have become key to effectively and efficiently prevent such costly occurrences.

### Distribution

#### What is a _product_ or _product name_? What is a _product variant_? What is a _pack_ or _package_?

Let's put ourselves in the position of a marketing and sales person. The software department has finished a new service and it will now become your _product_.
Before it can actively be sold to the market, you have to become creative to invent a story line that will help you to properly explain it to potential customers. This is where it starts differentiating between a _service_ and a _product_: A _service_ is what you are delivering, a _product_ is what you are offering to deliver the service later on. Sounds hairsplitting? Almost.

A product is _defined_, _designed_ and _formed_ precisely to support the whole line of distribution. You take the services that you have and shape a product out of it that will greatly help you to make the most money out of it. So eventually, all you need to do is to invent a fancy _product name_, right? Not quite.

For most of the services, Microsoft is selling different _product variants_ that will provide different feature sets to you, depending on how much you are willing to spend. Are you connecting the dots to the service plans from above already? Great, this is what they have been developed for in the first place.

Quite often, there is a direct 1-to-1 relationship between a product variant and a service plan. Both then actually mean the same thing, just one is the non-technical term, the other is the technical term.

Taking our imaginary example about a service plan structure from above, this looks very similar for a product and its variants:

````markdown
PRODUCT NAME
│
└─── PRODUCT NAME, variant 1
│        - Feature 1
│        - Feature 2
│        - Feature 3
│
└─── PRODUCT NAME, variant 2
│        - Feature 1
│        - Feature 2
│        - Feature 3
│        - Feature 4
│        - Feature 5
│        - Feature 6
│        - Feature 7
│
└─── PRODUCT NAME, variant 3
         - Feature 1
         - Feature 2
         - Feature 3
         - Feature 4
         - Feature 5
         - Feature 6
         - Feature 7
         - Feature 8
         - Feature 9
         - Feature 10
````

**Upselling and reduction of prices**

Once you realize which product variants matter most to your customers, you start thinking about how you could sell even more to them. This is called upselling and essentially what you are trying to achieve is to make your customers using more and more of your services and advanced features.

Microsoft has defined special products that I would describe as virtual products because they don't have a 1-to-1 relationship to a single service plan anymore. Instead, it is a bundle of many single products that Microsoft then calls a _package_ (short: _pack_). Obviously it makes sense to spend less money on the package than what you would need to spend for getting all the single licenses. To make packages even more attractive, there are sometimes services or features that can not be purchased as a single product.

If you almost got a mental breakdown because of all the different single products and all their product variants before, a package should then appear to you as your sheet anchor. Microsoft wants to make it easy for you (and your mental health) to go for a package instead of just one or two single products. Indeed, after considering only 2 or 3 single products, some packages become already cheaper and will also give you access to additional services you didn't actually consider in the first place.

However, of course there can be different variants of such a package again.

To keep things abstract with our imaginary example, a package and its variants would now finally look quite a bit different:

````markdown
PACKAGE NAME
│
└─── PACKAGE NAME, variant 1
│       └─── Product Name 1, variant 1
│       │        - Feature 1
│       │        - Feature 2
│       │        - Feature 3
│       └─── Product Name 2, variant 1
│       │        - Feature 1
│       │        - Feature 2
│       │        - Feature 3
│       └─── Product Name 3, variant 1
│                - Feature 1
│                - Feature 2
│                - Feature 3
│
└─── PACKAGE NAME, variant 2
│       └─── Product Name 1, variant 2
│       │        - Feature 1
│       │        - [...]
│       │        - Feature 7
│       └─── Product Name 2, variant 2
│       │        - Feature 1
│       │        - [...]
│       │        - Feature 7
│       └─── Product Name 3, variant 2
│                - Feature 1
│                - [...]
│                - Feature 7
│
└─── PACKAGE NAME, variant 3
│       └─── Product Name 1, variant 3
│       │        - Feature 1
│       │        - [...]
│       │        - Feature 10
│       └─── Product Name 2, variant 3
│       │        - Feature 1
│       │        - [...]
│       │        - Feature 10
│       └─── Product Name 3, variant 3
│       │        - Feature 1
│       │        - [...]
│       │        - Feature 10
│       └─── Product Name 4
│                - Feature 1
````

Did you already have candidates for packages in your mind? If you had thought about _Enterprise Mobility & Security_ or _Microsoft 365_, you're exactly right!

Congratulations if you had also thought about _Office 365_ being a package. Office 365 is likely the most missunderstood brand name ever. As you can see, it does not only describe a whole platform, it can also be interpreted as a licensing model. Not to mention all confusion between Office 365, Office ProPlus, and Office Online ([What is Office?](https://www.youtube.com/watch?v=QmJSPN7jLFw&feature=share)).

If course, when Microsoft was designing their new online services almost a decade ago, offering a _package_ and naming it _Office 365_ was all about it. There were even different package variants available already then. Have you read about _Office 365 Enterprise E1_ and _Office 365 Enterprise E2_? Here you go, those are the package variants!

However, today Microsoft has removed _Enterprise_ from the package names because essentially this is what the _E_ in _E1_ or _E2_ already represents. Meanwhile, we also got other packages for Small, Medium, and Mid-sized organizations. Wait, did I just say _Office 365 E**2**_? You got me, this package variant is not for sale anymore and got replaced by _Office 365 E3_. As you might have guessed, it is the same situation for _Office 365 E4_ which got replaced by _Office 365 E5_ some time ago. Now you even know the secret why you might have thought that Microsoft can't count from 1 to 5… makes sense now?

**Office 365 (O365)**

These are the essential packages you will always consider to purchase in one or more variants, depending on how many different use cases you have. I haven't seen any customer that would actually buy single product licenses for a majority of its user base anymore. Only for some edge use cases, customers would buy additional single product licenses in order to supplement a small group of users with some special features they require to have.

**Enterprise Mobility & Security (EMS)**

Actually, this name is a bit misleading as it should also contain something like _Identity Management_, _Governance_, or _Compliance_. A very essential and useful product variant that will help you with this comes with this package and is called _Azure Active Directory **Premium**_. Indeed, Microsoft should have put this as part of the Office 365 packages. They did not for a good (selling) reason: You should either purchase the single product license on top of your Office 365 package, or you should start realizing that this is almost half of the price of an EMS E3 package already.

Also, both buzzwords _Mobility_ and _Security_ likewise are hugely important nowadays. Users need to be flexible and work mobile almost always. This in turn triggers increased need for security protection, not to mention all regulatory and legal requirements that have increased so much. In fact those requirements have become so high that even smaller organizations have to think what they are doing to get a basic level of data loss prevention against unintentional data leaks, and to ensure data privacy (yes, it is this nasty acronym GDPR I am referring to).

**SPE**

...

**Microsoft 365 (M365)**

Do you miss anything from the _Office 365_ and _Enterprise Mobility & Security_ packages above? Maybe that is Windows and this is where Microsoft has now started to define _Windows as a service_. _Microsoft 365_ is indeed what the name indicates to be: Every service that Microsoft has to offer (Office 365 + Enterprise Mobility & Security) in a single package, now including Windows. To be fair: The package does not contain the basic Windows 10 license, it only consists of the Entperise supplementary license to upgrade a PC with an existing Windows 10 Home or Professional license to Windows 10 Enterprise. This is confusing, I know…

//... The integration between the different services is what Microsoft has forced last years
//... End-point protection.

**Azure**

...

#### What is a _license_ or _product license_? What is a _subscription_?

...

### Conclusion

...

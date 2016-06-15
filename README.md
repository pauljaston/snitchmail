## Snitchmail
Detect if people are inspecting your code and receieve an email (plus some silly stuff)
[Try it here](https://www.differentsignal.com) - just open the inspector. 

## Synopsis

It's a truth that wether you're passing a project around, or applying for a job, sooner or later someone will inspect your code. I thought it would be nice to know when that happens. 

This plugin has two parts:
  1) A jQuery plugin that monitors any page it's loaded on, detects the browser inspector being opened and then carries out some three possible actions. 
  2) A simple mail handler (you can use your own, but this is included for completeness)
  
## Actions

* Send an email notifying you that someone has inspected your code. Sends the page address and the user's IP. 

* Display a banner on the page with a message 

* Annoy - This is just daft, but it clears the console log and then runs the classic BASIC 20 goto 10 screen spam. 

## Settings

There are a few basic settings

```javascript
    var settings = {
      showAnnoy: true, //Clear the console log and be silly
      showBanner: true, //Display a message on the page
      sendEmail: true, //Send an email 
      annoyMessage: "I AM ACE", //Sillyness
      bannerBackground: "#f74e52", //Banner color
      bannerFont: "white", //Banner font colour
      bannerMessage: "Hello", //Message to dislpay
      prependTo: "body", //Page element to prepend the message  banner to.
    }
```

## Mail
 
 Email is handled by the mail/email.php file. It's a very simple template that uses the php sendmail function. You can hook up the AJAX function to your own mail handler. 
 
## Use
 
 If you're using the email file. Plop the mail folder in your site's root. Then add a link to the console.js file. 
 
  ```html
  <script src="js/console.min.js"></script>
```
   
## Disclaimer

This is basically one of those "great ideas at 2am kind of things", the code is inelegant and could do with some revision. It's also a bit stupid. 

## Attribution 

This is based on [zswang's](https://github.com/zswang) work on jsdetect and [sindresorhus'](https://github.com/sindresorhus) work on devtools-detect. 

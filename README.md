# TabList
TabList is a Safari Web Extension that lists all the open tabs and lets you navigate to whatever tab you want. I suppose people
similar to me would want to use this extension since dealing with 100s of open tabs (especially StackOverflow) gets real
annoying real quick. It sorts the tabs alphabetically and shows you the number of open tabs.

I'm planning on adding features as I feel the need or if someone requests something. This started as an extension
to display the memory usage per tab just like Brave does but, for now, Apple does not offer APIs for getting taskIDs for
each tab. Whenever they start doing that, I will release an update. I figured that navigating 100s of tabs was as useful to me
as knowing which tab is hogging memory and adding to my already massive swap numbers. Now, I can at least find tabs if not judge them.

## Installation
Download the zip or clone it and run it (double-click).

I don't have a developer ID (costs $99) which is why it's an unsigned extension. You will have to bypass GateKeeper and allow
unsigned extensions in Safari via `Safari->Settings->Developer->Extensions: Allow unsigned extensions`. If developer
tools are not enabled, you can enable it inside the advanced tab.

It's pretty easy to use, I'm sure you can figure it out.

### Note
You can find the code if you look into the bundle. It's written in TypeScript, but Webpack bundles it into JS.
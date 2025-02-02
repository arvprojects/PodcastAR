https://www.youtube.com/watch?v=vIh-0bSsjds [Video demo]

**Podcast AR is a platform that helps podcasters become closer to their users through augmented reality experiences.
**

A podcaster who owns a podcast that is available on spotify can create a podcast in our system and attach certain media (images) to certain timestamps within the podcast. Users will then be able to open our app, select a podcast, and as they listen, images will show up on the screen at the specified timestamps. The user also has the ability to control spotify (play, pause, skip). You can also capture a moment when listening to a podcast, this will save the current timestamp in your user profile. 


This is a v1 product meant to show the usefulness of a platform like this. We want to expand and create a UI for podcasters to add and modify different types of media besides just images to their podcast in an effort to give podcasters more ways to be closer to their listeners.

If you want to use the app. Please sign up and link your spotify at tinyurl.com/PodcastAR99. Once you have an account, make sure your spotify app is open and that you have interacted with it (played something) within the previous 30 seconds. This registers your device as active with the spotify api so we can start polling the playback state once you select a podcast. Once you've done that, all that's left is to select a podcast and listen!

NOTE: you must have spotify premium to use this app due to the spotify apis only working with premium users.

NOTE: There is a known bug with the spectacles web sockets where the glasses will crash when a websocket is closed. This means if the spectacles dont receive a message in the span of say a minute after the connection is opened the app will crash. We are working to figure out a solution to this. 

NOTE: The stop listening button on your left hand will tell our server to stop sending messages to the user until they select a new podcast.

Once you clone the repository, note that testing in lens studio will not work due to the fact that the snap api returns the snap username as snapUser if you are not running the app on the glasses. If you want to test on lens studio, go to the PodcastListGenerator.ts script and change the username variable in line 12 to your snap username.




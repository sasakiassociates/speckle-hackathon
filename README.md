# Speckle Dir Stat

project repo for the `speckle-hackathon` 2022


![polys](https://user-images.githubusercontent.com/30870056/168087093-f1af85ae-f680-446c-a427-05a412b745f7.png)

Models can get chunky sometimes. You drop in a chair that you downloaded from the web and all the sudden you can barely navigate around the your model 🙈.  Even though it’s a simple concept of hunting down geometry with high triangle counts, the designers using these models are not fully aware of how heavy models impact their files or how they can go about fixing it. 

This prototype is an interactive visualization for any user to understand the weight of each object within a speckle stream and can separate out any objects into different branches in order to clean up a model stream, similar to [WinDirStat](https://windirstat.net/) 

7MB model size | 23MB model size
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/30870056/168087181-b9ce2df4-fbcd-4646-8b65-9b8973494ccf.jpg)  |  ![](https://user-images.githubusercontent.com/30870056/168087364-0e7856b3-938d-41ca-88af-44b9ddd3c678.jpg)


In our group at Sasaki we often collaborate with design teams to integrate different technologies or workflow which typically results in the team sharing some sort of model, and it’s a been a common issue that we are handed a model that is extremely heavy but only has simple box-like geometry. We might end up jumping into their model and trying to find these lil’ chunky trouble makers and do some manual clean up. One time we were given a model of a campus master plan that represented the building masses with box geometry but the file was still massive. After a bit of snooping around we found multiple culprits with one of the main ones being a basketball hoop with the hope net fully modeled, hidden within one of the massing boxes 🤢   

Here is our submission video
[![Speckle Dir Stat](http://img.youtube.com/vi/PuqQshOqyEg/0.jpg)](http://www.youtube.com/watch?v=PuqQshOqyEg"Speckle Dir Stat")

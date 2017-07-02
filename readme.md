# TFD2017

> Tour de France 2017 live dashboard

This dashboard is an annually recurring project that is developed about one
month before the Tour De France (the most epic cycling event of the year). Every
time I try to find some sort of live data feed, hack it, morph it, and use it in
my own way.

It mainly prevents me from watching television at work all day. Instead I have
the live dashboard running on my second screen and enjoy its browser
notifications.

The project evolves every year and tries to use bleeding edge technology. I
don't care about your browser as this project is all about experimentation.

## Features
This year the project has the following features:

* RESTful node API (ES2015, promises)
* VueJS/Vuex SPA front-end

## Data sources

* dimensiondata.com

## Run it yourself

* Install Foreman globally

````
npm install -g foreman
````

* Create a .env file in the root of the project and add your credentials there.

```
NODE_ENV=development
```

With the above in place run:
```
npm i
npm start
```

Then visit:
[http://localhost:5000/](http://localhost:5000)

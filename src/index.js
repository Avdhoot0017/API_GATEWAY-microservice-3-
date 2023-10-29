const {serverConfig , Logger} = require('./config/index');
const express = require('express');
const  apiRoutes = require('./routes/index');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');





const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	max: 3,  // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	
})




// const { AboutController , homecontrller } = require('./config');//when we do this it autonmatically consider file index from congig



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(limiter);
app.use('/api' , apiRoutes);
app.use('/flightService', createProxyMiddleware({ target: serverConfig.FLIGHT_SERVICE, changeOrigin: true }));
app.use('/bookingService', createProxyMiddleware({ target: serverConfig.BOOKING_SERVICE, changeOrigin: true }));


//now hit localhost/api/v1/info 




app.listen(serverConfig.PORT , ()=>{

    console.log("sucsesfully start server");
    Logger.info("sucessfully starrted server  " , "root" , {});
})
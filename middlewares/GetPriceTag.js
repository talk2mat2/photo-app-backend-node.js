const PriceSchema =  require("../models/priceModel")

exports.GetPriceTag=async ()=>{
    const pricePerSession = await PriceSchema.findOne({tag:'priceTag'})
    if(pricePerSession && pricePerSession.price){
      console.log(pricePerSession)
      return pricePerSession.price
    }
    else{ return 500}
    }
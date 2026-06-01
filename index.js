const express=require('express');
const app=express();
app.use(express.json());
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','*');
  if(req.method==='OPTIONS')return res.sendStatus(200);
  next();
});
app.post('/api',async(req,res)=>{
  try{
    const r=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key':'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',
        'anthropic-version':'2023-06-01'
      },
      body:JSON.stringify(req.body)
    });
    const d=await r.json();
    res.json(d);
  }catch(e){res.status(500).json({error:e.message});}
});
app.listen(3000,()=>console.log('Jarvis proxy running'));

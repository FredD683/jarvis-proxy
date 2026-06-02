const express=require('express');
const https=require('https');
const app=express();
app.use(express.json());
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','*');
  if(req.method==='OPTIONS')return res.sendStatus(200);
  next();
});
app.post('/api',(req,res)=>{
  const data=JSON.stringify(req.body);
  const options={
    hostname:'api.anthropic.com',
    path:'/v1/messages',
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'x-api-key':'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',
      'anthropic-version':'2023-06-01',
      'Content-Length':Buffer.byteLength(data)
    }
  };
  const r=https.request(options,(apiRes)=>{
    let body='';
    apiRes.on('data',(chunk)=>body+=chunk);
    apiRes.on('end',()=>{
      try{res.json(JSON.parse(body));}
      catch(e){res.status(500).json({error:body});}
    });
  });
  r.on('error',(e)=>res.status(500).json({error:e.message}));
  r.write(data);
  r.end();
});
app.listen(3000,()=>console.log('Jarvis proxy running'));

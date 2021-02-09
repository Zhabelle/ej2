const express = require('express');
const Joi=require('joi');
const path = require('path');
const PORT = process.env.PORT || 3000;

const schema = Joi.object({
    id:Joi.number().required(),
    intakedate:Joi.string().required(),
    intakereason:Joi.string().required(),
    istransfer:Joi.number().required(),
    sheltercode:Joi.string().required(),
    identichipnumber:Joi.string().required(),
    animalname:Joi.string().required(),
    breedname:Joi.string().required(),
    basecolour:Joi.string().required(),
    speciesname:Joi.string().required(),
    animalage:Joi.string().required(),
    sexname:Joi.string().required(),
    location:Joi.string().required(),
    movementdate:Joi.string().required(),
    movementtype:Joi.string().required(),
    istrial:Joi.number().required(),
    returndate:Joi.string().required(),
    returnedreason:Joi.string().required(),
    deceaseddate:Joi.string().allow(null,''),
    deceasedreason:Joi.string().required(),
    diedoffshelter:Joi.number().required(),
    puttosleep:Joi.number().required(),
    isdoa:Joi.number().required()
});
const schema2 = Joi.object({
    id:Joi.number(),
    intakedate:Joi.string(),
    intakereason:Joi.string(),
    istransfer:Joi.number(),
    sheltercode:Joi.string(),
    identichipnumber:Joi.string(),
    animalname:Joi.string(),
    breedname:Joi.string(),
    basecolour:Joi.string(),
    speciesname:Joi.string(),
    animalage:Joi.string(),
    sexname:Joi.string(),
    location:Joi.string(),
    movementdate:Joi.string(),
    movementtype:Joi.string(),
    istrial:Joi.number(),
    returndate:Joi.string(),
    returnedreason:Joi.string(),
    deceaseddate:Joi.string().allow(null,''),
    deceasedreason:Joi.string(),
    diedoffshelter:Joi.number(),
    puttosleep:Joi.number(),
    isdoa:Joi.number()
});

let data=require('./data.json');

const { string, number } = require('joi');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    let datos=data;
    if(req.query.speciesname)
        datos=datos.filter(a=>a.speciesname.toUpperCase()==req.query.speciesname.toUpperCase());
    if(req.query.intakereason)
        datos=datos.filter(a=>a.intakereason.toUpperCase()==req.query.intakereason.toUpperCase());
    res.send(datos);
});

app.get('/:id',(req,res)=>{
    console.log(req.params.id)
    let awa=data.find(a=>a.id==req.params.id);
    if(!awa)res.status(404).send('Not Found');
    console.log(awa);
    res.send(awa);
});

app.post('/',(req,res)=>{
    console.log(req.body);
    const resp=schema.validate(req.body);
    if(resp.error)return res.status(400).send(resp.error.details[0].message);
    data.push(req.body);
    res.send('animal added');
});

app.put('/:id',(req,res)=>{
    let awa=data.findIndex(a=>a.id==req.params.id);
    if(awa<0)return res.status(404).send('not found');
    console.log(awa);
    const resp=schema2.validate(req.body);
    if(resp.error)return res.status(400).send(resp.error.details[0].message);
    let old=data[awa];
    let an={
        id:req.body.id?req.body.id:old.id,
        intakedate:req.body.intakedate?req.body.intakedate:old.intakedate,
        intakereason:req.body.intakereason?req.body.intakereason:old.intakereason,
        istransfer:req.body.istransfer?req.body.istransfer:old.istransfer,
        sheltercode:req.body.sheltercode?req.body.sheltercode:old.sheltercode,
        identichipnumber:req.body.identichipnumber?req.body.identichipnumber:old.identichipnumber,
        animalname:req.body.animalname?req.body.animalname:old.animalname,
        breedname:req.body.breedname?req.body.breedname:old.breedname,
        basecolour:req.body.basecolour?req.body.basecolour:old.basecolour,
        speciesname:req.body.speciesname?req.body.speciesname:old.speciesname,
        animalage:req.body.animalage?req.body.animalage:old.animalage,
        sexname:req.body.sexname?req.body.sexname:old.sexname,
        location:req.body.location?req.body.location:old.location,
        movementdate:req.body.movementdate?req.body.movementdate:old.movementdate,
        movementtype:req.body.movementtype?req.body.movementtype:old.movementtype,
        istrial:req.body.istrial?req.body.istrial:old.istrial,
        returndate:req.body.returndate?req.body.returndate:old.returndate,
        returnedreason:req.body.returnedreason?req.body.returnedreason:old.returnedreason,
        deceaseddate:req.body.deceaseddate?req.body.deceaseddate:old.deceaseddate,
        deceasedreason:req.body.deceasedreason?req.body.deceasedreason:old.deceasedreason,
        diedoffshelter:req.body.diedoffshelter?req.body.diedoffshelter:old.diedoffshelter,
        puttosleep:req.body.puttosleep?req.body.puttosleep:old.puttosleep,
        isdoa:req.body.isdoa?req.body.isdoa:old.isdoa
    };
    data[awa]=an;
    console.log(an);
    res.send('animal updated');
});

app.delete('/:id',(req,res)=>{
    let awa=data.findIndex(a=>a.id==req.params.id);
    if(awa<0)return res.status(404).send('not found');
    let an=data[awa];
    data.splice(awa,1);
    res.send(an);
});

app.listen(3000, () => console.log(`Example app listening at http://localhost:${PORT}`));

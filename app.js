const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");

var app = Express();

Mongoose.connect("mongodb://localhost:27017/book");


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const BookModel = Mongoose.model("book",
{ name: { type: String, require:true } });

app.post("/book", async (req, res) => {
    try {
        var person = new BookModel(req.body);
        var result = await person.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get("/books", async (req, res) => {
    try {
        var result = await BookModel.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get("/book/:id", async (req, res) => {
    try {
        var person = await BookModel.findById(req.params.id).exec();
        res.send(person);
    } catch (error) {
        res.status(500).send(error);
    }
});


  
app.put("/book/:id", async (req, res,next) => {
    try {
        var person = await BookModel.findById(req.params.id).exec();
        person.set(req.body);
        var result = await person.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("/book/:id", async (req, res) => {
    try {
        var result = await BookModel.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log("Listening at :3000...");
});
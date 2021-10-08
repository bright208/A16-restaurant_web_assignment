const express = require("express")
const app = express()
const port = 3000
const restaurant_list = require("./restaurant.json").results
const exphbs = require("express-handlebars")

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")


app.use(express.static("public"))


app.get("/", (req, res) => {

  res.render("index", { restaurant: restaurant_list })
})

app.get("/restaurants/:name_id", (req, res) => {

  const restaurant = restaurant_list.find(item => item.id.toString() === req.params.name_id)


  res.render("show", { restaurant: restaurant })
})

app.get("/search", (req, res) => {

  const keyword = req.query.keyword


  const filter_restaurant = restaurant_list.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase().trim()) || item.category.includes(keyword.trim()) || item.rating >= Number(keyword.trim()))

  res.render("index", { restaurant: filter_restaurant, keyword: keyword })

})

app.listen(port, () => {
  console.log("Express is listening on localhost")
})


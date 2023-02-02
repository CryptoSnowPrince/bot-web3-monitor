const data = require("./data.json")

const main = async () => {
  const products = data[0].category
  // console.log(json)
  // const products = [
  //   { name: 'apples', restaurant: 'fruits' },
  //   { name: 'oranges', restaurant: 'fruits' },
  //   { name: 'potatoes', restaurant: 'vegetables' }
  // ];
  const groupByCategory = products.reduce((group, product) => {
    const { restaurant } = product;
    group[restaurant] = group[restaurant] ?? [];
    group[restaurant].push(product);
    return group;
  }, {});
  console.log(groupByCategory);

}

main()
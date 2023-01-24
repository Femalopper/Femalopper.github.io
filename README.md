## Description

Online shop template is an adaptive and cross-browser template for fast online shops implementation. 

### Implemented features
- dynamic product catalog
- cart

## Animation

![Main functionality](https://github.com/Femalopper/raw/blob/main/images/online-shop-template/Online-shop-template.gif)

## Setup

### 1\. Clone project ###
 
  ```sh
   git clone git@github.com:Femalopper/online-shop-template.git

   cd online-shop-template

   npm ci

   sudo npm link
  ```
***

### 2\. Change products description and add new products ###
```sh
  cd online-shop-template/src/data

  code goods.json
```
The file goods.json consists of information about products.
The following fields in the file must be filled:
- articul (unique item number of the product)
- title (the name of the product)
- cost (the price of the product)
- image (image of the product)
- currency (must be the same for all products)

***
### 3\. Download products images ###

```sh
  cd online-shop-template/src/img
```
> All the images must be located in the img folder.

***
### 4\. Run app ###

```sh
  cd online-shop-template

  npm start
```
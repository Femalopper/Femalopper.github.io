[![Actions Status](https://github.com/Femalopper/online-shop-template/workflows/eslint-check/badge.svg?branch=main)](https://github.com/Femalopper/online-shop-template/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/22c27bb0af17a79a3931/maintainability)](https://codeclimate.com/github/Femalopper/online-shop-template/maintainability)

## Description

Online shop template is an adaptive and cross-browser template for fast online shops implementation. 

### Implemented features
:heavy_check_mark: Dynamic product catalog

:heavy_check_mark: Cart

## Animation

![Main functionality](https://github.com/Femalopper/raw/blob/main/images/online-shop-template/Online-shop-template.gif)

## Setup

### 1\. Clone project ###
 
  ```sh
   git clone git@github.com:Femalopper/online-shop-template.git

   cd online-shop-template

   npm ci
  ```
***

### 2\. Change products description and add new products ###
```sh
  cd online-shop-template/src/data

  code goods.json
```
The file goods.json consists of information about products.
The following fields in the file must be filled:

Field | Description 
:------------ | :-------------|
articul | unique item number of the product | 
title | the name of the product | 
cost | the price of the product | 
quantity | number of pcs | 
image | name of the image with extension | 
currency | must be the same for all products | 

***
### 3\. Download new products images ###

> All the images must be located in the img folder. Do not move img folder!

```sh
  cd online-shop-template/src/img
```

***

### 4\. Run app ###

```sh
  cd online-shop-template

  npm start
```
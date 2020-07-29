<template>
  <div id="app">
    <router-view />
  </div>
</template>



<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

#app {
  background: radial-gradient(
    82.33% 70.44% at 50% 0%,
    #26394d 0%,
    #212529 100%
  );
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}

* {
  padding: 0px;
  margin: 0px;
  border: 0px;
}
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
:focus,
:active {
  outline: none;
}
a:focus,
a:active {
  outline: none;
}
aside,
nav,
footer,
header,
section {
  display: block;
}
html,
body {
  height: 100%;
}
body {
  line-height: 1;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
input::-ms-clear {
  display: none;
}
button {
  cursor: pointer;
}
button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
a,
a:visited {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
ul li {
  list-style: none;
}
img {
  vertical-align: top;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: inherit;
  font-size: inherit;
}
</style>

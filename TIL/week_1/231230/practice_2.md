# 2-1-1
```html
<style>
    .transform {
        width: 100px;
        height: 100px;
        background-color: red;
        margin: 200px 0 0 200px;
        transform: rotate(45deg);
        transform: scale(2, 3);
        transform: translate(100px, 200px);
        transform: skew(10deg, 20deg);
    }
</style>
```

# 2-1-2
```html
<style>
    .transition {
        width: 100px;
        height: 100px;
        background-color: red;
        /*
        transition-property: width;
        transition-duration: 2s;
        transition-timing-function: linear;
        transition-delay: 1s;
        */
        transition: width 2s linear 1s;
    }

    .transition:hover {
        width: 300px;
    }
</style>
```

# 2-1-3
```html
<style>
    .animation {
        width: 300px;
        height: 300px;
        background-color: yellow;
        /*
        animation-name: changeWidth;
        animation-duration: 3s;
        animation-timing-function: linear;
        animation-delay: 1s;
        animation-iteration-count: 6;
        animation-direction: alternate;
        */

        animation: changeWidth 3s linear 1s 6 alternate;
    }

    @keyframes changeWidth {
        from {
            width: 300px;
        }

        to {
            width: 600px;
        }
    }
</style>
```

# 2-1-4
```html
<style>
    .box1 {
        width: 300px;
        height: 300px;
        background-color: red;

        animation: rotation 1500ms linear infinite alternate;
    }

    @keyframes rotation {
        from {
            transform: rotate(-10deg);
        }

        to {
            transform: rotate(10deg);
        }
    }
    </style>
```

# 2-1-5
```html
<style>
    #intro nav ul li a {
    font-size: 20px;
    font-weight: bold;
    transition: color 0.3s;
    }

    #intro nav ul li a:hover {
    color: #917f7f;
    }
</style>
```

# 2-1-6
```html
<style>
    #main article.one {
    background-color: #532fa1;
    transition: background-color 0.3s;
    }

    #main article.one:hover {
    background-color: #8683bd;
    }

    #main article.two {
    background-color: #a44789;
    transition: background-color 0.3s;
    }

    #main article.two:hover {
    background-color: #bf7eac;
    }

    #main article.three {
    background-color: #3ab6bc;
    transition: background-color 0.3s;
    }

    #main article.three:hover {
    background-color: #75ccd0;
    }
</style>
```

# 2-2-1
```html
<style>
    .media {
        width: 500px;
        height: 500px;
        background-color: red;
    }

    @media (min-width:320px) and (max-width:800px) {
        .media {
            width: 300px;
            height: 300px;
            background-color: yellow;
            border: blue solid 10px;
        }
    }
</style>
```

# 2-2-2
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

# 2-2-3
```html
<style>
    .media {
        width: 500px;
        height: 500px;
        background-color: yellow;
        border: solid 10px red;
    }

    @media (min-width: 320px) and (max-width: 800px) {
        .media {
            width: 300px;
            height: 300px;
            border: none;
        }
    }
</style>
```

# 2-2-4
```css
/* 미디어쿼리 작성시 #intro의 css 속성값보다 아래 위치에 작성 */
@media (min-width: 320px) and (max-width: 800px) {
  .container {
    width: 640px;
  }

  #intro {
    height: 160px;
  }
  #intro h1 {
    width: 100%;
  }
  #intro h1 a {
    text-align: center;
    padding: 22px 0 0 0;
  }
  #intro nav {
    width: 100%;
  }
}
```

# 2-2-5
```css
@media (min-width: 320px) and (max-width: 800px) {
  .container {
    width: 640px;
  }

  #intro {
    height: 160px;
  }

  #intro h1 {
    width: 100%;
  }

  #intro h1 a {
    text-align: center;
    padding: 22px 0 0 0;
  }

  #intro nav {
    width: 100%;
  }

  #main article {
    width: 100%;
    height: 420px;
  }
}
```

# 2-2-6
```css
@media (min-width: 320px) and (max-width: 1000px) {
  .container {
    width: 640px;
  }

  #intro {
    width: 100%;
  }

  #intro h1 {
    width: 100%;
    height: 160px;
  }

  #intro h1 a {
    text-align: center;
    padding: 22px 0 0 0;
  }

  #intro nav {
    width: 100%;
  }

  #main article {
    width: 100%;
    height: 420px;
  }

  #footer {
    padding: 30px 0;
  }

  #footer .copyright,
  #footer .address {
    width: 100%;
  }

  #footer .copyright p,
  #footer .address p {
    text-align: center;
    padding: 0;
  }
  #footer .address p {
    padding-top: 20px;
  }
}
```


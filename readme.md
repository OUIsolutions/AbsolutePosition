## Absolute Position
Absolute Position it's a position library, created for positional
elements on the screen in an extremely easy way.

## Running
for running , you just need to put the cdn script tag into your project.:
```html
<script src="https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@main/versions/AbsolutePosition_v0.58.js"></script>

```

## Source 
The Full Source Code it's available in:
<br>
[Source](https://github.com/OUIsolutions/AbsolutePosition)




## Basic Hello World

these it's the example  of a simple div
<br>

[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/start.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@main/versions/AbsolutePosition_v0.58.js"></script>

</head>
<body>
        <div  APosition="$16:9(50px,100px,200px,300px)" style="background-color: red;">

            Hello World
        </div>
</body>
</html>
```


## Understanding the Args 

Every time you type and **APosition** inside what ever tag , its became recognizable by the lib
after  you pass the following arguments:
#### Example:
```html
    <div  APosition=" $16:9         (50px, 100px,200px, 300px)">
                      AspectRatio    Left, Top  ,Width, Height
```
#### Measures
you can use **px**,**%**,**vh**,**vw** as the measures (I will add more on the future)

## Operators 
With the Operators **+** and **-**  you can determine positions dynamically on the screen

#### Putting a div next to each other on Horizontal

[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/next_to_each_other_horizontal.html)

As you can See the + operator increments 100px the value left of each div 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@main/versions/AbsolutePosition_v0.58.js"></script>

</head>
<body>
        <div  APosition="$16:9(00px,100px,100px,100px)" style="background-color: red;"></div>
        <div  APosition="$16:9(+100px,100px,100px,100px)" style="background-color: blue;"></div>
        <div  APosition="$16:9(+100px,100px,100px,100px)" style="background-color: red;"></div>
        <div  APosition="$16:9(+100px,100px,100px,100px)" style="background-color: blue;"></div>

</body>
</html>
```
#### Putting a div next to each other on Vertical

[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/next_to_each_other_vertical.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@main/versions/AbsolutePosition_v0.58.js"></script>

</head>
<body>
        <div  APosition="$16:9(0px,0px,100px,100px)" style="background-color: red;"></div>
        <div  APosition="$16:9(0px,+100px,100px,100px)" style="background-color: blue;"></div>
        <div  APosition="$16:9(0px,+100px,100px,100px)" style="background-color: red;"></div>
        <div  APosition="$16:9(0px,+100px,100px,100px)" style="background-color: blue;"></div>

</body>
</html>
```

####  Putting a div next to each other on Horizontal from right to left
you also can put divs from button to the top or from right to the left 
by using the **-** operators


[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/next_to_each_other_horizontal_from_right_to_left.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@main/versions/AbsolutePosition_v0.58.js"></script>

</head>
<body>
        <div  APosition="$16:9(800px,100px,100px,100px)" style="background-color: red;"></div>
        <div  APosition="$16:9(-100px,100px,100px,100px)" style="background-color: blue;"></div>
        <div  APosition="$16:9(-100px,100px,100px,100px)" style="background-color: red;"></div>
        <div  APosition="$16:9(-100px,100px,100px,100px)" style="background-color: blue;"></div>

</body>
</html>
```

## Centralizing Elements 

With the % prop, you can centralize or position  an element in every part you want 


#### Horizontal Centralization

[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/horizontal_centralization.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@main/versions/AbsolutePosition_v0.58.js"></script>

</head>
<body>
        <div  APosition="$16:9(200px,200px,200px,200px)" style="background-color: red;">
            <div  APosition="$16:9(0%,33.3%,100%,33.3%)" style="background-color: blue;">
            </div>

        </div>
</body>
</html>
```

#### Vertical Centralization
[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/vertical_centralization.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@main/versions/AbsolutePosition_v0.58.js"></script>

</head>
<body>
        <div  APosition="$16:9(200px,200px,200px,200px)" style="background-color: red;">
            <div  APosition="$16:9(33.3%,0%,33.3%,100%)" style="background-color: blue;">
            </div>

        </div>
</body>
</html>
```

#### Full Centralization
[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/full_centralization.html)

## Macros 
With Macros, you can define macros to replace the code into the tag 
these it's useful when you want to avoid code repetition
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@main/versions/AbsolutePosition_v0.58.js"></script>
</head>
<body>

<script>APosition_define_macro("test","+100px,100px,100px,100px")</script>

<div  APosition="$16:9(00px,100px,100px,100px)" style="background-color: red;"></div>
<div  APosition="$16:9(test)" style="background-color: blue;"></div>
<div  APosition="$16:9(test)" style="background-color: red;"></div>
<div  APosition="$16:9(test)" style="background-color: blue;"></div>

</body>
</html>
```
[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/macros.html)


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@main/versions/AbsolutePosition_v0.58.js"></script>

</head>
<body>
        <div  APosition="$16:9(200px,200px,200px,200px)" style="background-color: red;">
            <div  APosition="$16:9(33.3%,33.3%,33.3%,33.3%)" style="background-color: #0033ff;">
            </div>

        </div>
</body>
</html>
```

## Error Handling 
if some error happen on some tag it will be showed on console 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@main/versions/AbsolutePosition_v0.58.js"></script>
</head>
<body>
        <div  APosition="$16:9ddpx,100px,200px,300px)" style="background-color: red;">

            Hello World
        </div>
</body>
</html>
```
[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/error.html)

### Disabling error Logs 
if you want to disable error logs , you just need to set the variable **absolute_position_show_errors** 
to false 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/AbsolutePosition@main/versions/AbsolutePosition_v0.58.js"></script>
</head>
<body>

        <script>
            absolute_position_show_errors = false;
        </script>

        <div  APosition="$16:9ddpx,100px,200px,300px)" style="background-color: red;">

            Hello World
        </div>
</body>
</html>
```

[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/error_disable.html)


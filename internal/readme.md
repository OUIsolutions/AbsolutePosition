## Absolute Position
Absolute Position it's a position library, created for positional
elements on the screen in an extremely easy way.

## Running
for running , you just need to put the cdn script tag into your project.:
#ref:script_start.html

## Source 
The Full Source Code it's available in:
<br>
[Source](https://github.com/OUIsolutions/AbsolutePosition)




## Basic Hello World

these it's the example  of a simple div
<br>

[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/start.html)

#ref:start.html


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

#ref:next_to_each_other_horizontal.html
#### Putting a div next to each other on Vertical

[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/next_to_each_other_vertical.html)

#ref:next_to_each_other_vertical.html

####  Putting a div next to each other on Horizontal from right to left
you also can put divs from button to the top or from right to the left 
by using the **-** operators


[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/next_to_each_other_horizontal_from_right_to_left.html)

#ref:next_to_each_other_horizontal_from_right_to_left.html

## Centralizing Elements 

With the % prop, you can centralize or position  an element in every part you want 


#### Horizontal Centralization

[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/horizontal_centralization.html)

#ref:horizontal_centralization.html

#### Vertical Centralization
[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/vertical_centralization.html)

#ref:vertical_centralization.html

#### Full Centralization
[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/full_centralization.html)


#### Mod Operator
With the mod operator:**%**  we can determine diferents behaviors based on current iteration
of the element, allowing simulate flexbox behavior,for example, if %3 means every time its a multiple of 
3(0,3,6,9,12) , it will put that measures instead of default measures.

#ref:mod.html

[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/mod.html)





## Macros 
With Macros, you can define macros to replace the code into the tag 
these it's useful when you want to avoid code repetition
#ref:macros.html
[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/macros.html)


#ref:full_centralization.html

## Error Handling 
if some error happen on some tag it will be showed on console 

#ref:error.html
[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/error.html)

### Disabling error Logs 
if you want to disable error logs , you just need to set the variable **absolute_position_show_errors** 
to false 

#ref:error_disable.html

[Page of The Following Code](https://ouisolutions.github.io/AbsolutePosition/internal/exemples/error_disable.html)


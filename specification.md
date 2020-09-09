# Extended BBCode Parser - Specification

## Preamble

The specification is located in the `bbElements` constant.<br>
Check the "[Custom tags](readme.md#custom-tags)" section in the main readme for more info on this structure.

The tags follow this format: `[tag=val1 id2=val2]`, `[/tag]`<br>
Where `tag` is the tag, `val1` is the value of the default tag parameter, `val2` is the value of the paramater named `id2`.

[Note about line returns]

[Note about the p that wraps everything]

## Summary

* [Bold text](#bold-text), [Italic text](#italic-text), [Underlined text](#underlined-text), 
[Strikethrough text](#strikethrough-text), [Text size](#text-size), [Text color](#text-color)
* [Headers](#headers), [Supertext](#supertext), [Subtext](#subtext), [Footnote](#footnote), 
[Link](#link), [Spoiler](spoiler)
* []()

## Specification

The parameter line is ommited if none are supported by the tag.

### Bold text
<b>Tags:</b><br>
`b`, `bold`

<b>Output:</b><br>
`<span class="bb-bold">`, `</span>`
<br><hr>

### Italic text
<b>Tags:</b><br>
`i`, `italic`

<b>Output:</b><br>
`<span class="bb-italic">`, `</span>`
<br><hr>

### Underlined text
<b>Tags:</b><br>
`u`, `underline`

<b>Output:</b><br>
`<span class="bb-underline">`, `</span>`
<br><hr>

### Strikethrough text
<b>Tags:</b><br>
`s`, `strikethrough`

<b>Output:</b><br>
`<span class="bb-strikethrough">`, `</span>`
<br><hr>

### Text size
<b>Tag:</b><br>
`size`

<b>Parameter:</b><br>
<table>
	<tr>
		<td><b>Keys</b></td>
		<td><b>Default</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>
			size, value
		</td>
		<td>Yes</td>
		<td>Size to apply to the text within the tag.</td>
	</tr>
</table>

<b>Output:</b><br>
`<span style="font-size: ${size};">`, `</span>`
<br><hr>

### Text color
<b>Tag:</b><br>
`color`, `colour`

<b>Parameter:</b><br>
<table>
	<tr>
		<td><b>Keys</b></td>
		<td><b>Default</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>
			color, colour, value
		</td>
		<td>Yes</td>
		<td>Color to apply to the text within the tag.</td>
	</tr>
</table>

<b>Output:</b><br>
`<span style="color: ${color};">`, `</span>`
<br><hr>

### Headers
<b>Tag:</b><br>
`h1`, `h2`, `h3`, `h4`, `h5`

<b>Output:</b><br>
`<h2>`, `</h2>`<br>
`<h3>`, `</h3>`<br>
`<h4>`, `</h4>`<br>
`<h5>`, `</h5>`<br>
`<h6>`, `</h6>`

<b>Note:</b><br>
The number is shifted by one to keep the `<h1>` intact for SEO.
<br><hr>

### Supertext
<b>Tags:</b><br>
`sup`, `supertext`

<b>Output:</b><br>
`<sup>`, `</sup>`
<br><hr>

### Subtext
<b>Tags:</b><br>
`sub`, `subtext`

<b>Output:</b><br>
`<sub>`, `</sub>`
<br><hr>

### Footnote
<b>Tags:</b><br>
`footnote`

<b>Output:</b><br>
`<span class="bb-footnote">`, `</span>`

<b>Note:</b><br>
This tag should be used for image footnotes, timestamps or any text that need to be subtle.
<br><hr>

### Link
<b>Tags:</b><br>
`a`, `link`

<b>Parameter:</b><br>
<table>
	<tr>
		<td><b>Keys</b></td>
		<td><b>Default</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>
			url, src
		</td>
		<td>Yes</td>
		<td>Color to apply to the text within the tag.</td>
	</tr>
</table>

<b>Output:</b><br>
`<a href="${url}">`, `</a>`
<br><hr>

### Spoiler
<b>Tags:</b><br>
`spoil`, `spoiler`

<b>Output:</b><br>
`<span class="bb-spoil">`, `</span>`
<br><hr>

<hr><hr><hr><hr><hr>

<!--
### Quotes
`[quote]quote[/quote]`<br>
```html
<blockquote>
    <p>quote</p>
</blockquote>
```
<br>

`[quote="author"]quote[/quote]`<br>
`[quote author="author"]quote[/quote]`
```html
<blockquote>
    <p>quote</p>
    <p class="bb-quote-author">author</p>
</blockquote>
```
The styling on these element will be done with the following CSS selector `.bb-container blockquote`
-->


### Details
`[detail]text[/detail]`<br>
```html
<details>
    <summary>Click to expand</summary>
    <p>text</p>
</details>
```
<br>

`[detail="title"]text[/detail]`<br>
`[detail title="title"]text[/detail]`<br>
```html
<detail>
    <summary>title</summary>
    <p>text</p>
</detail>
```

<detail>
    <summary>title</summary>
    <p>text</p>
</detail>

### Tab
`[tab]content[/tab]`
```html
<div class="bb-tab">content</div>
```

### Tables
```
[table]
    [tr]
        [td]Row 1, Col 1[/td]
        [td]Row 1, Col 2[/td]
        [td]Row 1, Col 3[/td]
        [td r=2]Row 1, Col 4[/td]
    [/tr]
    [tr]
        [td c=2]Row 2, Col 1[/td]
        [td]Row 2, Col 3[/td]
    [/tr]
[/table]
```
```html
<table>
    <tr>
        <td>Row 1, Col 1</td>
        <td>Row 1, Col 2</td>
        <td>Row 1, Col 3</td>
        <td rowspan="2">Row 1, Col 4</td>
    </tr>
    <tr>
        <td colspan="2">Row 2, Col 1</td>
        <td>Row 2, Col 3</td>
    </tr>
</table>
```

### Lists


```
[list]
    [*]Entry A
    [*]Entry B
[/list]
```
```html
<ul>
    <li>Entry A</li>
    <li>Entry B</li>
</ul>
```
<br>

```
[olist]
    [*]Entry 1
    [*]Entry 2
[/list]
```
```html
<ol>
    <li>Entry 1</li>
    <li>Entry 2</li>
</ol>
```


## IFrames and advanced elements

### Progress bar
`[progress=percent]title[/progress]`<br>
```html
<!-- Not sure !!! -->
<div class="bb-progress">
    <p>title</p>
    <div>
        <div style="width: percent%"></div>
    </div>
</div>
```

### Youtube video
`[youtube]url[/youtube]`<br>
`[yt]url[/yt]`<br>
```html
<iframe width="560" height="315" src="url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

### Steam game card
`[steam]AppID[/steam]`<br>
`[steam=AppID][/steam]`<br>
```html
<iframe src="http://store.steampowered.com/widget/AppID" frameborder="0" width="646" height="190"></iframe>
```

## Toggles

### Line returns

Line returns are all replaced with a `<br>` tag, unless you use this tag to disable it:<br>
`[br-on]`

After that, you can use the following tag to enable it again:<br>
`[br-off]`

And if you want to manually add a `<br>` tag anywhere you can use:<br>
`[br]`

<!--
`[youtube]url[/youtube]`<br>
`[yt]url[/yt]`<br>
```html
<iframe width="560" height="315" src="url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

[code][/code]
[kbd][/kbd]
[titlebar][/titlebar]

// inline image (text wrapped around)
//tooltip, tooltipwindow
// fontawesome
// badge (name, val)

[font], [highlight], [align], [float], [pre], [s], [glow], [shadow], [dropshadow], [blur], 
[fade], [dir], [marq], [spoil], [hidden], [offtopic], [mod], [nfo], [soundcloud], [BBvideo]

``<br>
```html
```

[spoiler={INTTEXT;defaultValue=Spoiler}]{TEXT}[/spoiler]

HTML Replacement: Select all
<span class="spoiler-inline-js"><input type="button" value="{INTTEXT}" class="button2" style="font-size:10px; padding: 0px 3px; border-radius: 2px;" onclick="nextSibling.style.display = nextSibling.style.display==='none' ? 'block' : 'none';" /><div style="margin-top: 3px; padding: 5px; border: 1px dotted darkgray; display: none;">{TEXT}</div></span>

Help Line: Select all
Spoiler: [spoiler]text[/spoiler], [spoiler=Title]text[/spoiler]

-->
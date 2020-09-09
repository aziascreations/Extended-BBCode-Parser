# Extended BBCode Parser

A crude BBCode parser that outputs a string that contains HTML elements.

Do not use it on in a production/critical environment, it messes up often and easily.

## Usage

Just add the js file in your page and call the function `processText(rawText)` with your raw BBCode as the `rawText` argument.

And you will either get the parsed HTML code or an error string that follows this format: `ERROR: <message>`.

Check "[demo.html](demo.html)" for an example, or "[this link (UNAVAILABLE)]()" for a live demo.

## Specification

Go to the "[Specification page](specification.md)" to read it.

## Custom tags

You can easily add custom tags by modifying the `bbElements` constant.

It is an array of objects that follow this structure:
<table>
	<tr>
		<td><b>Field</b></td>
		<td><b>Type</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>tags</td>
		<td>String[]</td>
		<td>Array that contains the BBCode tags that refer to this element.</td>
	</tr>
	<tr>
		<td>htmlElement</td>
		<td>String</td>
		<td>The HTML element that will be used for opening and closing this tag.</td>
	</tr>
	<tr>
		<td>htmlElementDefaultParams</td>
		<td>String</td>
		<td>Optional String that is added to the opening HTML element if the `parameters` field is undefined, null or empty.</td>
	</tr>
	<tr>
		<td>parameters</td>
		<td>Parameter[]</td>
		<td>Optional array of Parameter objects that define all the possible parameters for the tag.</td>
	</tr>
</table>

And here is the Parameter structure:
<table>
	<tr>
		<td><b>Field</b></td>
		<td><b>Type</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>name</td>
		<td>String[]</td>
		<td>Array of strings that correspond to this parameter.</td>
	</tr>
	<tr>
		<td>isRequired</td>
		<td>Boolean</td>
		<td>
			Indicates wether or not this parameter is required to parse this tag.<br>
			Returns an error message if the parameter is not declared in the BBCode.
		</td>
	</tr>
	<tr>
		<td>isDefault</td>
		<td>Boolean</td>
		<td>
			Indicates wether or not this parameter is the one that will be parsed if it is joined to the tag like this: `[tag=val]`.<br>
			Returns an error message if a parameter like this is used an no parameter is set as the default one.
		</td>
	</tr>
	<tr>
		<td>isTagParameter</td>
		<td>Boolean</td>
		<td>Indicates wether or not the value of this parameter should be put inside the final HTML element as a value like: &lt;a arg1="val1"&gt;.</td>
	</tr>
	<tr>
		<td>tagValueKey</td>
		<td>String</td>
		<td>Used as the parameter key in the HTML element is `isTagParameter` is set to true.</td>
	</tr>
	<tr>
		<td>tagValueContentPrefix</td>
		<td>String</td>
		<td>???</td>
	</tr>
	<tr>
		<td>tagValueContentSuffix</td>
		<td>String</td>
		<td>???</td>
	</tr>
</table>


## License

[Unlicense](LICENSE)

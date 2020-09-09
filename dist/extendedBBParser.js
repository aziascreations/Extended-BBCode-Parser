const bbElements = [
	{
		tags: ["b", "bold"],
		htmlElement: "span",
		htmlElementDefaultParams: "class=\"bb-bold\""
	},
	{
		tags: ["i", "italic"],
		htmlElement: "span",
		htmlElementDefaultParams: "class=\"bb-italic\""
	},
	{
		tags: ["u", "underline"],
		htmlElement: "span",
		htmlElementDefaultParams: "class=\"bb-underline\""
	},
	{
		tags: ["s", "strikethrough"],
		htmlElement: "span",
		htmlElementDefaultParams: "class=\"bb-strikethrough\""
	},
	{
		tags: ["size"],
		htmlElement: "span",
		parameters: [
			{
				name: ["value", "size"],
				isRequired: true,
				isDefault: true,
				isTagParameter: true,
				tagValueKey: "style",
				tagValueContentPrefix: "\"font-size:",
				tagValueContentSuffix: ";\"",
				isExternalElement: false,
				externalElementTag: null,
				externalElementValues: null
			}
		]
	},{
		tags: ["color", "colour"],
		htmlElement: "span",
		parameters: [
			{
				name: ["value", "color", "colour"],
				isRequired: true,
				isDefault: true,
				isTagParameter: true,
				tagValueKey: "style",
				tagValueContentPrefix: "\"color:",
				tagValueContentSuffix: ";\"",
				isExternalElement: false,
				externalElementTag: null,
				externalElementValues: null
			}
		]
	},
	{
		tags: ["h1"],
		htmlElement: "h2"
	},
	{
		tags: ["h2"],
		htmlElement: "h3"
	},
	{
		tags: ["h3"],
		htmlElement: "h4"
	},
	{
		tags: ["h4"],
		htmlElement: "h5"
	},
	{
		tags: ["h5"],
		htmlElement: "h6"
	},
	{
		tags: ["sup", "supertext"],
		htmlElement: "sup"
	},
	{
		tags: ["sub", "subtext"],
		htmlElement: "sub"
	},
	{
		tags: ["footnote"],
		htmlElement: "span",
		htmlElementDefaultParams: "class=\"bb-footnote\""
	},
	{
		tags: ["a", "link"],
		htmlElement: "a",
		parameters: [
			{
				name: ["url", "src"],
				isRequired: true,
				isDefault: true,
				isTagParameter: true,
				tagValueKey: "href",
				tagValueContentPrefix: "\"",
				tagValueContentSuffix: "\"",
				isExternalElement: false,
				externalElementTag: null,
				externalElementValues: null
			}
		]
	},
	/*{
				tags: ["quote"],
				htmlElement: "blockquote",
				parameters: [
					{
						name: ["value", "size"],
						isRequired: true,
						isDefault: true,
						isTagParameter: true,
						tagValueKey: "style",
						tagValueContentPrefix: "",
						tagValueContentSuffix: "",
						isExternalElement: false,
						externalElementTag: null,
						externalElementValues: null
					}
				]
			},*/
	{
		tags: ["spoil", "spoiler"],
		htmlElement: "span",
		htmlElementDefaultParams: "class=\"bb-spoil\""
	},
	{
		tags: ["detail", "details"],
		htmlElement: "details"
	},
	{
		tags: ["tab"],
		htmlElement: "div",
		htmlElementDefaultParams: "class=\"bb-tab\""
	},
	{
		tags: ["table"],
		htmlElement: "table"
	},
	{
		tags: ["tr", "table-row"],
		htmlElement: "tr"
	},
	{
		tags: ["td", "table-cell", "table-data"],
		htmlElement: "td",
		parameters: [
			{
				name: ["c", "colspan"],
				isRequired: false,
				isDefault: false,
				isTagParameter: true,
				tagValueKey: "colspan",
				tagValueContentPrefix: "",
				tagValueContentSuffix: "",
				isExternalElement: false,
				externalElementTag: null,
				externalElementValues: null
			},
			{
				name: ["r", "rowspan"],
				isRequired: false,
				isDefault: false,
				isTagParameter: true,
				tagValueKey: "rowspan",
				tagValueContentPrefix: "",
				tagValueContentSuffix: "",
				isExternalElement: false,
				externalElementTag: null,
				externalElementValues: null
			}
		]
	},
	{
		tags: ["br"],
		htmlElement: "br"
	}
];
const bbRegex = /(\[\/?[a-zA-Z\d\-]+(\s?(\w+)?="?([\w\d:/\?%\.#]+)"?)*\]|[\w\d\n\t\réèàê\s,\.;\u00C0-\u017F]+)/gm;
const bbArgsRegex = /([\w\-]*="?([\w\d:/\?%\.#]+)"?)/gm;

function getBBElementByTag(tag) {
	var usedElement = null;
	bbElements.forEach(function(element) {
		if(element.tags.includes(tag)) {
			usedElement = element;
			return;
		}
	});
	return usedElement;
}

function processLine(line, autoLineReturn, currentTagDepth) {
	var matches = line.match(bbRegex);
	var returnedValue = {
		text: "",
		tagDepthChange: 0
	}

	if(matches === null) {
		matches = [];
	}

	matches.forEach(function(match) {
		var usedElement = {};

		if(match.startsWith("[/")) {
			usedElement = getBBElementByTag(match.substring(2, match.length-1));
			if(usedElement === null) {
				returnedValue.error = "ERROR: Closing tag is unknown -> "+match;
				return;
			}
			returnedValue.text += "</"+usedElement.htmlElement+">";
		} else if(match.startsWith("[")) {
			// Extracts [mytag from [mytag=aaa v="e"]...
			var tagKey = match.match(/\[(\w|\d|\-)+/gm)[0].substring(1);
			usedElement = getBBElementByTag(tagKey);

			if(usedElement === undefined || usedElement === null) {
				returnedValue.error = "ERROR: Openning tag is unknown -> "+tagKey+" | "+match;
				return;
			}

			if(usedElement.parameters === undefined || usedElement.parameters === null ||
			   usedElement.parameters.length === 0) {
				if(usedElement.htmlElementDefaultParams !== undefined &&
				   usedElement.htmlElementDefaultParams !== null) {
					returnedValue.text += "<"+usedElement.htmlElement+" "+
						usedElement.htmlElementDefaultParams+">";
				} else {
					returnedValue.text += "<"+usedElement.htmlElement+">";
				}
			} else {
				// Parsing arguments...
				var elementData = JSON.parse(JSON.stringify(usedElement));
				elementData.parameters.forEach(function f(param) {
					if(param.isRequired === undefined || usedElement.isRequired === null) {
						param.isRequired = false;
					}
					param.wasUsed = false;
				});

				// Parsing and saving arguments' values
				var unparsedArguments = match.substring(tagKey.length+1, match.length - 1);

				var parsedArguments = unparsedArguments.match(bbArgsRegex);
				if(parsedArguments === null) {
					parsedArguments = [];
				}

				parsedArguments.forEach(function f(singleArgument) {
					var argumentParts = singleArgument.split(/=(.+)/);

					if(argumentParts.length < 2) {
						returnedValue.error = "ERROR: No value found for argument -> "+singleArgument+" | "+match;
						return;
					}

					var elementDataArgument = null;

					if(argumentParts[0].length > 0) {
						// finding by key
						elementData.parameters.forEach(function g(param) {
							if(param.name.includes(argumentParts[0])) {
								elementDataArgument = param;
							}
						});
					} else {
						// searching default
						elementData.parameters.forEach(function g(param) {
							if(param.isDefault) {
								elementDataArgument = param;
							}
						});
					}

					if(elementDataArgument === null) {
						returnedValue.error = "ERROR: Unable to find used parameter -> "+singleArgument+
							" ; For tag -> "+match;
						return;
					}

					// TODO: Check for double usage !

					// Removing the quotes if there are any
					elementDataArgument.value = argumentParts[1];
					if(elementDataArgument.value.length >= 3) {
						if(elementDataArgument.value.startsWith("\"")) {
							elementDataArgument.value = elementDataArgument.value.substring(1);
						}
						if(elementDataArgument.value.endsWith("\"")) {
							elementDataArgument.value = elementDataArgument.value.substring(
								0, elementDataArgument.value.length - 1
							);
						}
					}

					elementDataArgument.wasUsed = true;
				});
				if(returnedValue["error"] !== undefined) {
					return;
				}


				// Going over every argument that puts something inside the HTML tag...
				returnedValue.text += "<"+elementData.htmlElement;
				elementData.parameters.forEach(function f(param) {
					if(param.isTagParameter) {
						if(param.isRequired && !param.wasUsed) {
							returnedValue.error = "ERROR: Required parameter was not used -> "+param.name[0]+" | "+match;
						}

						if(param.wasUsed) {
							returnedValue.text += " " + param.tagValueKey + "=" + 
								param.tagValueContentPrefix + param.value + param.tagValueContentSuffix;
						}
					}
				});
				returnedValue.text += ">";
				if(returnedValue["error"] !== undefined) {
					return;
				}

				// Going over every argument that puts something outside the HTML tag...
				elementData.parameters.forEach(function f(param) {
					if(param.isExternalElement) {
						if(param.isRequired && !param.wasUsed) {
							returnedValue.error = "ERROR: Required arg was not used -> "+param.name[0]+" | "+match;
						}

						if(param.wasUsed) {
							console.error("WTF !!!");
						}
					}
				});
				if(returnedValue["error"] !== undefined) {
					return;
				}

				//console.log("Done processing openning tag.");
			}
		} else {
			returnedValue.text += match.replace(/[&<>]/g, {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;'
			});
		}
	});

	return returnedValue;
}

// Splits the text into lines, calls processLine() for each of them
//  and check if errors occured and handles the <br> tag stuff.
function processText(rawText) {
	var outputText = "";
	var hasEncounteredAnError = false;
	var autoLineReturn = true;
	var currentTagDepth = 0;

	rawText.split('\n').forEach(function(line) {
		// Check if an error occurred previously and aborting if it has
		if(hasEncounteredAnError) {
			return;
		}

		// Process the line
		var returnedValue = processLine(line, autoLineReturn, currentTagDepth);

		// Check if an error occurred
		if(returnedValue["error"] !== undefined) {
			outputText = returnedValue.error;
			hasEncounteredAnError = true;
			return;
		}

		// ???
		if(typeof returnedValue.lineReturnStatus === 'boolean') {
			autoLineReturn = returnedValue.lineReturnStatus;
		}

		outputText += returnedValue.text;
		/*if(autoLineReturn) {
				   outputText += "<br>\n";
				}/**/
		outputText += "\n";

		currentTagDepth += returnedValue.tagDepthChange;
		if(currentTagDepth < 0) {
			outputText = "ERROR: Invalid tag depth ! (Less than 0)";
			hasEncounteredAnError = true;
			return;
		}
	});

	// TODO: Add <br> to every empty line, every line that doesn't finish with a > or ones that finish with </span>

	return outputText;
}
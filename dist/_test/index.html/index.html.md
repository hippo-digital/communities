[Skip to content](#content)

[](/)

[Back to communities](/)

# \_test

# Heading Level 1

## Heading level 2

### Heading level 3

#### Heading level 4

##### Heading level 5

###### Heading level 6

**bold text**

*italicized text*

> blockquote

1. First item
2. Second item
3. Third item

* First item
* Second item
* Third item

`code`

***

[Link referencing this page](/_test/)

[Internal link](/)

[External link](https://www.google.com)

[title](https://www.example.com)

![Picture of a kitten](https://placekitten.com/300/300)

## No alt text kitten

![](https://placekitten.com/301/301)

## Intentionally blank alt text kitten

![...](https://placekitten.com/302/302)

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

Here’s a sentence with a footnote. [1](#user-content-fn-1)

~~The world is flat.~~

* [x] Write the press release
* [ ] Update the website
* [ ] Contact the media

That is so funny! 😂

H~~2~~O

X^2^

## Error messages for directives

### Empty include

Could not include partial

Error: partial file name is empty

Code that caused the error:

```
::include[]
```

### Include something that does not exist

Could not include partial

Error: partial "\_does-not-exist.html" does not exist in "/Users/aaron/src/communities/\_includes"

Code that caused the error:

```
::include[_does-not-exist.html]
```

### Include something that doesnt begin with an underscore

Could not include partial

Error: partial "\_layout.html" does not exist in "/Users/aaron/src/communities/\_includes"

Code that caused the error:

```
::include[layout.html]
```

### Include itself

Could not include partial

Error: partial "\_test.md" does not exist in "/Users/aaron/src/communities/\_includes"

Code that caused the error:

```
::include[_test.md]
```

### Include sidebar

Could not include partial

Error: partial "\_Sidebar.md" does not exist in "/Users/aaron/src/communities/\_includes"

Code that caused the error:

```
::include[_Sidebar.md]
```

### Undefined directives

undefinedTextDirective

undefinedLeafDirective

undefinedContainerDirective

undefinedContainerDirectiveContent

## GitHub references

[**@NickColley**](https://github.com/NickColley)

[#7](https://github.com/hippo-digital/communities/issues/7)

From: <https://www.markdownguide.org/cheat-sheet/>

## Footnotes

1. This is the footnote. [↩](#user-content-fnref-1)

[Back to top](#top)

[Accessibility statement](/Accessibility/)

* [Nick Colley edited this page 3rd November 2022 at 10:13am](https://github.com/hippo-digital/communities/wiki/_test/_compare/44c0cc7a51cf5030ff35aaea80bd663013a913c7?diff=unified)
* [Edit this page](https://github.com/hippo-digital/communities/wiki/_test/_edit)

## Development data

### Constants

```
{
  "WEBSITE_URL": "https://communities.hippodigital.co.uk",
  "BASE_HREF": "/",
  "DEPLOYED": false,
  "GITHUB_REPOSITORY": "hippo-digital/communities",
  "GITHUB_REPOSITORY_OWNER": "hippo-digital",
  "GITHUB_REPOSITORY_NAME": "communities"
}
```

### Page

```
{
  "date": "2024-02-27T11:07:42.007Z",
  "inputPath": "./_wiki/_test.md",
  "fileSlug": "_test",
  "filePathStem": "/_test",
  "outputFileExtension": "html",
  "templateSyntax": "njk,md",
  "url": "/_test/",
  "outputPath": "_site/_test/index.html"
}
```

### Git Log

```
{
  "commit": "44c0cc7a51cf5030ff35aaea80bd663013a913c7",
  "author": "Nick Colley",
  "date": "Thu, 3 Nov 2022 10:13:15 +0000"
}
```

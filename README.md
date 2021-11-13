# [<img src="https://rollingscopes.com/images/logo_rs2.svg" alt="Rolling Scopes School" width="100">][rss] ◽ [NodeJS Course][rss-nodejs] ◽ [2021Q4][schedule]

# Ciphering CLI tool

- [Task description][t1-descr]
- [Cross-check criteria][t1-cross-check]
- Date: [01.11.2021 - 14.11.2021][schedule]
- Development branch: [task-1][t1-dev-branch]
- Pull request: [pull-1][t1-pull-request]

[logo]: https://rollingscopes.com/images/logo_rs2.svg
[rss]: https://rs.school
[rss-nodejs]: https://rs.school/nodejs/
[rss-nodejs-gh]: https://github.com/rolling-scopes-school/basic-nodejs-course
[schedule]: https://docs.google.com/spreadsheets/d/1XNsmckYlUy36kVTYrAylxpVYWTGvMc4RaS-xxgRbdmE/edit#gid=926002411

[t1-descr]: ./docs/task-1/description.md
[t1-cross-check]: ./docs/task-1/cross-check.md
[t1-dev-branch]: ../../tree/task-1
[t1-pull-request]: ../../pull/1

### Running tool (variants)

```shell
  node ciphering-tool ...options
```
```shell
  node ./ciphering-tool/ ...options
```
```shell
  node ./ciphering-tool/index.js ...options
```

### CLI Options

1. **-c, --config**: config for ciphers. Config is a string with pattern `{XY(-)}n`, where:
   - `X` is a cipher mark:
     - `A` is for [Atbash cipher][atbash]
     - `C` is for [Caesar cipher][caesar] (with shift 1)
     - `R` is for [ROT-8 cipher][rot-13] (as variation of ROT-13)
   - `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
     - `1` is for encoding
     - `0` is for decoding
2. **-i, --input**: a path to input file.
   - if this option is missed - `stdin` used as an input source.
3. **-o, --output**: a path to output file.
   - if this option is missed - `stdout` used as an output destination.

[atbash]: https://en.wikipedia.org/wiki/Atbash
[caesar]: https://en.wikipedia.org/wiki/Caesar_cipher
[rot-13]: https://en.wikipedia.org/wiki/ROT13

### Usage example:

```shell
  node ciphering-tool -i ./input.txt -o ./output.txt -c C1-C1-R0-A
```
| File       | Content                                     |
|------------|---------------------------------------------|
| input.txt  | `This is secret. Message about "_" symbol!` |
| output.txt | `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!` |
<br>

```shell
  node ciphering-tool -c C1-C0-A-R1-R0-A-R0-R0-C1-A -i ./input.txt
```
| File      | Content                                     |
|-----------|---------------------------------------------|
| input.txt | `This is secret. Message about "_" symbol!` |
| `stdout`  | `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!` |
<br>

```shell
  node ciphering-tool --config A-A-A-R1-R0-R0-R0-C1-C1-A
```
| File     | Content                                     |
|----------|---------------------------------------------|
| `stdin`  | `This is secret. Message about "_" symbol!` |
| `stdout` | `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!` |
<br>

```shell
  node ciphering-tool -c C1-R1-C0-C0-A-R0-R1-R1-A-C1 -o ./output.txt
```
| File       | Content                                     |
|------------|---------------------------------------------|
| `stdin`    | `This is secret. Message about "_" symbol!` |
| output.txt | `This is secret. Message about "_" symbol!` |


> [Original description.][origin]

[origin]: https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/testing.md

# Testing

Write tests for Ciphering machine CLI from 1st task.  
For writing tests [Jest](https://jestjs.io/) testing framework should be used.

You can write simple unit tests on single functions (e.g. ciphering function, arguments parsing function, config validation function, etc.), mock some modules, test CLI using [child processes](https://nodejs.org/dist/latest-v14.x/docs/api/child_process.html) and so on.

## Scenarios

### Error scenarios
| №   | Input                                                                                    |
|-----|------------------------------------------------------------------------------------------|
| 1   | User passes the same cli argument twice                                                  |
| 2   | User doesn't pass -c or --config argument                                                |
| 3   | User passes -i argument with path that doesn't exist or with no read access              |
| 4   | User passes -o argument with path to directory that doesn't exist or with no read access |
| 5   | User passes incorrect symbols in argument for --config                                   |

### Success scenarios
| №   | Input                                                                                            |
|-----|--------------------------------------------------------------------------------------------------|
| 1   | User passes correct sequence of symbols as argument for --config that matches regular expression |
| 2   | Usage examples from [first task description][t1-description].                                    |


[t1-description]: ../task-1/description.md
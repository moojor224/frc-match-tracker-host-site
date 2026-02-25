# Bluetooth Messages

| message id      | params               | host handle                                   | esp32 handle                                                                                 |
| --------------- | -------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------- |
| resetMatches    | none                 | never                                         | reset stored matches to null/empty arr                                                       |
| setNumMatches   | <number>             | never                                         | set length of matches arr to arg0                                                            |
| setMatch        | <number>:<MatchData> | never                                         | set match data at given index to given data                                                  |
| setTime         | <number>             | never                                         | take the current millis and map it to the given time. used to get current real time later on |
| setNumRows      | <number>             | set the number of rows available to show data | never                                                                                        |
| setLeftAlliance | <0,1>                | never                                         | sets which alliance is shown on the left. 0=red, 1=blue                                      |
|                 |                      |                                               |                                                                                              |

# [7.0.0](https://github.com/thenativeweb/defekt/compare/6.0.2...7.0.0) (2021-03-25)


### Features

* Rewrite from scratch and add algebraic Result type. ([#283](https://github.com/thenativeweb/defekt/issues/283)) ([5f8cafd](https://github.com/thenativeweb/defekt/commit/5f8cafd9781e888e81c9055a75a091e6169fc603))


### BREAKING CHANGES

* The old defekt interface is obsolete and has been completely replaced.

## [6.0.2](https://github.com/thenativeweb/defekt/compare/6.0.1...6.0.2) (2021-01-20)


### Bug Fixes

* Replace humanize string with own implementation. ([#250](https://github.com/thenativeweb/defekt/issues/250)) ([da09278](https://github.com/thenativeweb/defekt/commit/da092783b1651a8d537a6e1952d1b890bfadbac2))

## [6.0.1](https://github.com/thenativeweb/defekt/compare/6.0.0...6.0.1) (2020-11-26)


### Bug Fixes

* Add readme section regarding `isError`. ([#224](https://github.com/thenativeweb/defekt/issues/224)) ([ec995da](https://github.com/thenativeweb/defekt/commit/ec995da030e2e3707e3bcb216950d434d26c7189))

# [6.0.0](https://github.com/thenativeweb/defekt/compare/5.3.0...6.0.0) (2020-11-26)


### Bug Fixes

* Change type of cause to unknown. ([#222](https://github.com/thenativeweb/defekt/issues/222)) ([c79da3f](https://github.com/thenativeweb/defekt/commit/c79da3f0acb2595de65b345625d0485fb59faff1))


### BREAKING CHANGES

* So far, `cause` was of type `Error`. Now it is of type `unknown`, which better represents the behavior of JavaScript and TypeScript.

# [5.3.0](https://github.com/thenativeweb/defekt/compare/5.2.2...5.3.0) (2020-11-26)


### Features

* Add isError function. ([#221](https://github.com/thenativeweb/defekt/issues/221)) ([dfb3f4c](https://github.com/thenativeweb/defekt/commit/dfb3f4c281976ac7c41785d1ee46e080653e243e))

## [5.2.2](https://github.com/thenativeweb/defekt/compare/5.2.1...5.2.2) (2020-11-03)


### Bug Fixes

* Fix headline for robot section in readme. ([#197](https://github.com/thenativeweb/defekt/issues/197)) ([142d81b](https://github.com/thenativeweb/defekt/commit/142d81b01ba4eb4f2086021c7b76b59dbba9c4a3))

## [5.2.1](https://github.com/thenativeweb/defekt/compare/5.2.0...5.2.1) (2020-10-28)


### Bug Fixes

* Update dependencies. ([#191](https://github.com/thenativeweb/defekt/issues/191)) ([ee3a227](https://github.com/thenativeweb/defekt/commit/ee3a227b5a627c844782f5a543e766c53cce496d))

# [5.2.0](https://github.com/thenativeweb/defekt/compare/5.1.0...5.2.0) (2020-10-13)


### Features

* Add isCustomError type predicate. ([#186](https://github.com/thenativeweb/defekt/issues/186)) ([ba37f91](https://github.com/thenativeweb/defekt/commit/ba37f9131e16609d577d8d8c8b675b6d5b63459f))

# [5.1.0](https://github.com/thenativeweb/defekt/compare/5.0.1...5.1.0) (2020-07-13)


### Features

* Add static error code to error constructors. ([#148](https://github.com/thenativeweb/defekt/issues/148)) ([b20351a](https://github.com/thenativeweb/defekt/commit/b20351a0707d1b0ec3ad9c4b6b283ee8a1382a46))

## [5.0.1](https://github.com/thenativeweb/defekt/compare/5.0.0...5.0.1) (2020-02-03)


### Bug Fixes

* Improve documentation. ([#96](https://github.com/thenativeweb/defekt/issues/96)) ([7b36942](https://github.com/thenativeweb/defekt/commit/7b36942a4214454705aa3e326ef870625eae8120))

# [9.3.0](https://github.com/thenativeweb/defekt/compare/9.2.0...9.3.0) (2022-08-09)


### Features

* Allow type-definition of CustomError.data ([#366](https://github.com/thenativeweb/defekt/issues/366)) ([23f5b25](https://github.com/thenativeweb/defekt/commit/23f5b259558781cbb92e3c33a187f12e74965799))

# [9.2.0](https://github.com/thenativeweb/defekt/compare/9.1.1...9.2.0) (2022-06-01)


### Features

* Implement ensureUnknownIsError and extend readme. ([#363](https://github.com/thenativeweb/defekt/issues/363)) ([0abf81d](https://github.com/thenativeweb/defekt/commit/0abf81da1067b68f2d5f90029f1180aebbfbf4eb))

## [9.1.1](https://github.com/thenativeweb/defekt/compare/9.1.0...9.1.1) (2022-03-25)


### Bug Fixes

* bump minimist from 1.2.5 to 1.2.6 ([#360](https://github.com/thenativeweb/defekt/issues/360)) ([4d5779b](https://github.com/thenativeweb/defekt/commit/4d5779b68dfce2ae56f23e892f602e7720bbdae3))

# [9.1.0](https://github.com/thenativeweb/defekt/compare/9.0.0...9.1.0) (2022-03-24)


### Features

* Allow an arbitrary type as default in unwrapOrDefault. ([#359](https://github.com/thenativeweb/defekt/issues/359)) ([ff99448](https://github.com/thenativeweb/defekt/commit/ff99448913f48f68f55760970852a38475456f35))

# [9.0.0](https://github.com/thenativeweb/defekt/compare/8.2.0...9.0.0) (2022-03-23)


### Bug Fixes

* Adjust CustomError.cause type to changes in TypeScript. ([#358](https://github.com/thenativeweb/defekt/issues/358)) ([a288ae1](https://github.com/thenativeweb/defekt/commit/a288ae1f5748c066717c7632dc5e00946868d860))


### BREAKING CHANGES

* This restricts the type of `cause` to `Error | undefined`.

# [8.2.0](https://github.com/thenativeweb/defekt/compare/8.1.0...8.2.0) (2022-02-22)


### Features

* Hydrate CustomError and Result. ([#344](https://github.com/thenativeweb/defekt/issues/344)) ([3f4343c](https://github.com/thenativeweb/defekt/commit/3f4343c06ebceea735f5f086768cdfc5c2e04340))

# [8.1.0](https://github.com/thenativeweb/defekt/compare/8.0.0...8.1.0) (2022-01-17)


### Features

* Add `unwrapErrorOrThrow`. ([#350](https://github.com/thenativeweb/defekt/issues/350)) ([8e0cafd](https://github.com/thenativeweb/defekt/commit/8e0cafd43ce34d0a861f31d8226b0d59f7581833)), closes [#349](https://github.com/thenativeweb/defekt/issues/349)

# [8.0.0](https://github.com/thenativeweb/defekt/compare/7.3.3...8.0.0) (2021-08-24)


### Bug Fixes

* rename ErrorConstructor to CustomErrorConstructor ([#340](https://github.com/thenativeweb/defekt/issues/340)) ([d581477](https://github.com/thenativeweb/defekt/commit/d581477879d24b9c53b3349a853170387ff25762))


### BREAKING CHANGES

* ErrorConstructor was renamed to CustomErrorConstructor

If you're currently importing the ErrorConstructor interface from
defekt, you will need to change these import to CustomErrorConstructor.

## [7.3.3](https://github.com/thenativeweb/defekt/compare/7.3.2...7.3.3) (2021-08-22)


### Bug Fixes

* bump path-parse from 1.0.6 to 1.0.7 ([#337](https://github.com/thenativeweb/defekt/issues/337)) ([8fe870d](https://github.com/thenativeweb/defekt/commit/8fe870db0973246a4573edc56e143c8a17e2f8e9))

## [7.3.2](https://github.com/thenativeweb/defekt/compare/7.3.1...7.3.2) (2021-07-23)


### Bug Fixes

* Remove type information discarding. ([#332](https://github.com/thenativeweb/defekt/issues/332)) ([bfa3e56](https://github.com/thenativeweb/defekt/commit/bfa3e56d2c8394a7968ffb05d6c52e614f3b3522))

## [7.3.1](https://github.com/thenativeweb/defekt/compare/7.3.0...7.3.1) (2021-07-12)


### Bug Fixes

* Restructure type hierarchy so that types don't conflict internally. ([#330](https://github.com/thenativeweb/defekt/issues/330)) ([610302d](https://github.com/thenativeweb/defekt/commit/610302d31f2fe350393994fb84e8e6160657aca5))

# [7.3.0](https://github.com/thenativeweb/defekt/compare/7.2.3...7.3.0) (2021-07-03)


### Features

* Make early returns after error/value checks more convenient ([#326](https://github.com/thenativeweb/defekt/issues/326)) ([e27d0e5](https://github.com/thenativeweb/defekt/commit/e27d0e5c65822b8c36a519816f47cf5a3f04c411))

## [7.2.3](https://github.com/thenativeweb/defekt/compare/7.2.2...7.2.3) (2021-06-10)


### Bug Fixes

* bump normalize-url from 6.0.0 to 6.0.1 ([#321](https://github.com/thenativeweb/defekt/issues/321)) ([719e1e2](https://github.com/thenativeweb/defekt/commit/719e1e2e6dfeb9f5afec81b1cd3d152c4aac892e))

## [7.2.2](https://github.com/thenativeweb/defekt/compare/7.2.1...7.2.2) (2021-06-08)


### Bug Fixes

* bump trim-newlines from 3.0.0 to 3.0.1 ([#319](https://github.com/thenativeweb/defekt/issues/319)) ([9c45b23](https://github.com/thenativeweb/defekt/commit/9c45b23dc291637bf5e94a4686fffaed37307dc3))

## [7.2.1](https://github.com/thenativeweb/defekt/compare/7.2.0...7.2.1) (2021-06-08)


### Bug Fixes

* bump glob-parent from 5.1.1 to 5.1.2 ([#320](https://github.com/thenativeweb/defekt/issues/320)) ([2f28e8d](https://github.com/thenativeweb/defekt/commit/2f28e8d3041958c67f0c4f78157d05cf4a7b3c16))

# [7.2.0](https://github.com/thenativeweb/defekt/compare/7.1.2...7.2.0) (2021-05-25)


### Features

* Add callback to unwrapOrThrow to transform errors. ([#314](https://github.com/thenativeweb/defekt/issues/314)) ([c7512d2](https://github.com/thenativeweb/defekt/commit/c7512d2c87ed3863baf996b5f5dbc8645232563f))

## [7.1.2](https://github.com/thenativeweb/defekt/compare/7.1.1...7.1.2) (2021-05-18)


### Bug Fixes

* IsCustomError now works as intended; IsError is now simpler. ([#309](https://github.com/thenativeweb/defekt/issues/309)) ([db33b8b](https://github.com/thenativeweb/defekt/commit/db33b8bd68e93c1bf1b3af6e93f2f38ece8ce32f))

## [7.1.1](https://github.com/thenativeweb/defekt/compare/7.1.0...7.1.1) (2021-05-10)


### Bug Fixes

* bump hosted-git-info from 2.8.8 to 2.8.9 ([#306](https://github.com/thenativeweb/defekt/issues/306)) ([15a83e2](https://github.com/thenativeweb/defekt/commit/15a83e203ad1d412ce00c8201d1c7b2198cd75c8))

# [7.1.0](https://github.com/thenativeweb/defekt/compare/7.0.4...7.1.0) (2021-03-29)


### Features

* Add type-guard isResult. ([#297](https://github.com/thenativeweb/defekt/issues/297)) ([2d1e15a](https://github.com/thenativeweb/defekt/commit/2d1e15a51a853edb961c4ede8970ec9cbcac54fe))

## [7.0.4](https://github.com/thenativeweb/defekt/compare/7.0.3...7.0.4) (2021-03-25)


### Bug Fixes

* Fix wrong usage of error constructor in documentation. ([#289](https://github.com/thenativeweb/defekt/issues/289)) ([459b063](https://github.com/thenativeweb/defekt/commit/459b0639969f0ab3708f983c896f695f3232c3d0))

## [7.0.3](https://github.com/thenativeweb/defekt/compare/7.0.2...7.0.3) (2021-03-25)


### Bug Fixes

* update examples in README ([#287](https://github.com/thenativeweb/defekt/issues/287)) ([3b2b1ae](https://github.com/thenativeweb/defekt/commit/3b2b1ae0f1f3e1fee0ea53d724f231500fe03528))

## [7.0.2](https://github.com/thenativeweb/defekt/compare/7.0.1...7.0.2) (2021-03-25)


### Bug Fixes

* Add missing TValue and TError generics to constructors. ([#286](https://github.com/thenativeweb/defekt/issues/286)) ([df18c64](https://github.com/thenativeweb/defekt/commit/df18c640c197c8862db68785490b8b7a6d803252))

## [7.0.1](https://github.com/thenativeweb/defekt/compare/7.0.0...7.0.1) (2021-03-25)


### Bug Fixes

* Replace master by main ([#285](https://github.com/thenativeweb/defekt/issues/285)) ([23e0f2c](https://github.com/thenativeweb/defekt/commit/23e0f2c5b08bbea139ae611ecdf4bcf2dd6d27d5))

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

cd /Users/livingroom/Desktop/michael-io-app
ng serve

console.cloud.google.com
masimpson123@gmail.com
msio-u7qjhl7iia-uc.a.run.app

# BUILD IMAGE
cd /Users/livingroom/Desktop/michael-io-app
open docker desktop or run the docker daemon some other way
docker build --platform linux/amd64 -t msio .

# UPLOAD TO GCP
docker tag msio us-central1-docker.pkg.dev/endpoint-one/endpoint-one/msio:<mmddyy>
docker push us-central1-docker.pkg.dev/endpoint-one/endpoint-one/msio:<mmddyy>

! GitHub has excellent SSH documentation
! brew upgrade google-cloud-sdk
! https://medium.com/@larry_nguyen/how-to-deploy-angular-application-on-google-cloud-run-c6d472e07bd5

# FriendLogger

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

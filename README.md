# EvoMaster GitHub Action

This is a GitHub Action for running [EvoMaster](https://github.com/WebFuzzing/EvoMaster) as part of CI. 


## Usage

For now, it is recommended to use this action only for _black-box_ testing.
Documentation and configuration settings for _white-box_ testing will be done in the future. 

Example of configuration:

```
- name: Build the Application
  run: ... # this swill depend on your application

- name: Start Docker Compose
  run: docker compose up -d --build

- uses: webfuzzing/evomaster-action@v1
  with:
    args: >- 
         --writeWFCReport true
         --blackBox true  
         --bbSwaggerUrl http://localhost:8080/v3/api-docs
         --maxTime 20s
         --showProgress false
     failOnErrors: "true"

- name: Upload Generated Files
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: results
    path: ./generated_tests

- name: Stop Docker Compose
  if: always()
  run: docker compose down
```


How you want to run _EvoMaster_ is CI is up to you, e.g., if on each commit, or only on specific branches, or only for PRs, etc. 
Then, there are five steps.

1) Need to build your application. This will be programming language and framework dependent.

2) The recommended way to start your application is with _Docker Compose_. This alo helps if you need to start databases (e.g., Postgres, MySQL and MongoDB). 

3) Use `webfuzzing/evomaster-action@v1` to run _EvoMaster_. 

4) Upload the generated tests created by _EvoMaster_. This will enable you to download them as a zip file. 

5) Shutdown the application using _Docker Compose_


At the moment, this action has 2 options:

* __failOnErrors__: specify whether to fail the build if any fault was detected by _EvoMaster_.

* __args__: command-line arguments given to _EvoMaster_. These are exactly the same you would use when running _EvoMaster_ on your local machine. 

In this example, we used the arguments:

* _--writeWFCReport true_: this is essential to analyze the results of _EvoMaster_ (e.g., to fail the build if any fault is found). Future versions of _EvoMaster_ might have this option on by default, but still specifying it manually here does not harm

* _--blackBox true_: specifying we are doing _black_box_ testing. for historical reasons, default testing mode in _EvoMaster_ is _white-box_.
 
* _--bbSwaggerUrl http://localhost:8080/v3/api-docs_: when testing a REST API, need to tell where to find the schema. In this example, it is provided by the API itself, which is listening on port 8080. Note, however, that _Docker Compose_ needs to be configured to expose such port, so that _EvoMaster_ can communicate with the API running inside _Docker Compose_.  

* _--maxTime 20s_: specify for how long to run _EvoMaster_. The longer you run it the better results you can expect. Ideally, try to run for at least 10 minutes, but better if for 1 hour, or more. 

* _--showProgress false_: a progress bar is useful when running _EvoMaster_ on a local shell. But, on GitHub Actions, the line-overwrite feature does not work, and each update creates new lines. This can flood the logs of this action. If this is a problem, this option can be used to deactivate these logs. 


## New Features

At the time of writing, this is a first version of this new GitHub Action.
Several new features will be added in the next coming months. 
If there is any important feature you think it is missing, please let us know by creating a new post on the [Discussions page](https://github.com/WebFuzzing/evomaster-action/discussions).




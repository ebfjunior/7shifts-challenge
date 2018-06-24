# 7Shifts Challenge

## Getting Started

### Prerequisites

To get this project working on your local machine, is necessary install `docker`. Click on [this link](https://docs.docker.com/docker-for-mac/install/) for more information about the docker installation.

### Installing

To install the project is pretty simple. You just need to enter the following command at the root of the project:

```
make install
```

### Running

Run the project is also quite simple. You have to enter the following command:

```
make start
```

And now, your application will be available at `http://localhost:3001/overtime`

## Output

For each found user, i have splitted the data between year, month and week to facilitate the access to overtime information.

So, a valid sample of an output would be:

```
{
  517147: {
    2017: {
      10: {
        2: {
          entries: {
            '2017-10-10': 8,
            '2017-10-11': 8,
            '2017-10-12': 8,
            '2017-10-13': 8,
            '2017-10-14': 8,
          },
          regularHours: 40,
          regularWage: 400,
          extraDailyHours: 0,
          extraDailyWage: 0,
          extraWeeklyHours: 0,
          extraWeeklyWage: 0,
          totalHours: 40,
          totalWage: 400,
        },
        3: {
          entries: {
            '2017-10-15': 18,
            '2017-10-16': 3,
            '2017-10-17': 8,
            '2017-10-18': 8,
            '2017-10-19': 8,
          },
          regularHours: 35,
          regularWage: 350,
          extraDailyHours: 10,
          extraDailyWage: 150,
          extraWeeklyHours: 5,
          extraWeeklyWage: 100,
          totalHours: 45,
          totalWage: 600,
        },
      },
    },
  }
}
```

Where `517147` is the userId, `2017` is the given year, `10` is its month and the numbers `2` and `3` are the week numbers.

## Cool stuffs

- I used a in memory cache strategy for loading of timePunches json, because it is too big.
- I used docker for provide the infrastructure

## What i would do if i had more time

- I am doing a lot of loops on the data structure to proccess the informations, and it could has a performance issue.
- I couldn't write a lot of tests because i had a problem with the library which makes a mock of `axios` requests, and i loose so much time there. So i would improve and organize better my tests.
- I started to build a react environment to delivery the `bonus 1`, but i hadn't time

## Final considerations

There are some things i couldn't tell you at interview because i was nervous, but i would like to say that i also have some experience with devops with AWS, using terraform, ansible, etc.

I also would like to thank you so much for this opportunity!
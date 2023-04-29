
## Loco

Download and upload file on google drive with NodeJS – easy as cake! 🍰✉️


### Built With


* [![Node][Node.js]][Node-url]

## Getting Started

Steps to run locally

1. Clone the repo
   ```sh
   git clone https://github.com/MWaris97/drive-upload-nodejs.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Follow my [article](https://medium.com/@mwariscse/upload-files-to-google-drive-with-nodejs-d0c24d4b4dc0) to setup service account on google and download json file

4. Place the json file in the your working directory

## Usage

1. view all the files
```
node loco.js list
```
2. upload a file
```
node loco.js upload <filename>
```
3. update the file
```
node loco.js update <filename> <file_id>
```
4. download the file
```
node loco.js update <filename> <file_id>
```


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en

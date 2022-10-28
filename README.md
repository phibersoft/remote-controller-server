## Notice: Archived
Project is moving to [Remote Controller with Python](https://github.com/phibersoft/remote-controller-python-server).

## Remote Controller Server Side

This is the server side of the remote controller. It is a simple web server that runs on your local computer.

### Installation (as a user)

- Connect to wifi on your computer
- Download the "remote.exe" file from the latest release
- Run the file

### Installation (as a developer)

- Clone this repository

- Install some dependencies for robotJS
  - Python 3+
  - Visual Studio 2015+ (With Desktop Development C++ Workload)
  - Node version 16+
```bash
    # Firstly, install node-gyp globally
    npm install -g node-gyp
    
    # Configure npm for Visual Studio
    npm config set msvs_version 2017 # 2017 may replaced
    
    # Build node-gyp
    node-gyp rebuild --verbose
```

- Continue with installing "pkg" for extracting output as .exe
```bash
    npm install -g pkg
```

#### Developing
- Fill the .env file

```bash
    npm run dev # locally run on your terminal
    
    npm run build # develop app with webpack and build with pkg, extracts output as "remote-controller-server.exe"
    
    npm run build:debug # develop app with --verbose logging
```

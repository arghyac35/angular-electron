import { Injectable } from '@angular/core';

import { ElectronService } from './electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    path = '';
    data = null;

    constructor(public electronService: ElectronService) {

        const opts = {
            // We'll call our data file 'todo-data'
            configName: 'todo-data',
            defaults: {
              // 800x600 is the default size of our window
              windowBounds: { width: 800, height: 600 }
            }
        };
        // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
        // app.getPath('userData') will return a string of the user's app data directory path.
        const userDataPath = this.electronService.remote.app.getPath('userData');
        // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
        this.path = this.electronService.path.join(userDataPath, opts.configName + '.json');
        console.log('path-->', this.path);

        this.data = this.parseDataFile(this.path, opts.defaults);
    }

    // This will just return the property on the `data` object
    get(key) {
        return this.data[key];
    }

    // ...and this will set it
    set(key, val) {
        this.data[key] = val;
        // Wait, I thought using the node.js' synchronous APIs was bad form?
        // We're not writing a server so there's not nearly the same IO demand on the process
        // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
        // we might lose that data. Note that in a real app, we would try/catch this.
        this.electronService.fs.writeFileSync(this.path, JSON.stringify(this.data));
    }

    parseDataFile(filePath, defaults) {
        // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
        // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
        try {
            return JSON.parse(<any>this.electronService.fs.readFileSync(filePath));
        } catch (error) {
            // if there was some kind of error, return the passed in defaults instead.
            return defaults;
        }
    }
}

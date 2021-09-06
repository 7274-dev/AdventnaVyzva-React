// TODO code: check if all functions here are up-to-date and nothing is missing
// TODO code: clean up this file (maybe split functions into different files)
// TODO code: add querying functions (so we don't have to call makeGetRequest)

// api docs: https://github.com/7274-dev/AdventnaVyzva-GlobalBackend/wiki/Docs

import { sha512 } from 'js-sha512';

import * as auth from './auth';
import * as student from './student';
import * as teacher from './teacher';
import * as homework from './homework';
import * as file from './file';
import * as utils from './utils';

// TODO code: change to https when ready
const backendUrl = 'http://localhost:8080';

export {
    auth,
    student,
    teacher,
    homework,
    file,
    utils,
    sha512, backendUrl
};

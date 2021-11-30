// api docs: https://github.com/7274-dev/AdventnaVyzva-GlobalBackend/wiki/Docs

import { sha512 } from 'js-sha512';

import * as makeAuthenticatedRequest from './makeAuthenticatedRequest';
import * as auth from './auth';
import * as student from './student';
import * as teacher from './teacher';
import * as homework from './homework';
import * as file from './file';
import * as utils from './utils';
import * as clazz from './class';

// !!! only enter domain without "/" at the end !!!
const backendUrl = 'https://adventnavyzva.hrabcak.eu';

export {
    makeAuthenticatedRequest,
    auth,
    student,
    teacher,
    homework,
    file,
    utils,
    sha512,
    clazz,
    backendUrl
}

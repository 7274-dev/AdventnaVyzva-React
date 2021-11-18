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

// TODO code &prod: change to https when ready
const backendUrl = 'http://127.0.0.1:8080';

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

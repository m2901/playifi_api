const path = require('path');
const basePath = `${path.join(__dirname, './../')}`;
module.exports = {
  getModelBasePath,
  getComponentBasePath,
  getModel,
  getComponent,
  getPolicyBasePath,
  getPolicy,
  getUtilsBasePath,
  getAssetsBasePath
};

function getModelBasePath() {
  return `${basePath}/config/models/`;
}

function getUtilsBasePath() {
  return `${basePath}/config/utils/`;
}

function getComponentBasePath() {
  return `${basePath}components/`;
}

function getPolicyBasePath() {
  return `${basePath}/config/policies/`;
}

function getModel(modelPath) {
  return `${getModelBasePath()}${modelPath}`;
}

function getComponent(componentPath) {
  return `${getComponentBasePath()}${componentPath}`;
}

function getPolicy(policyPath) {
  return `${getPolicyBasePath()}${policyPath}`;
}

function getAssetsBasePath() {
  return `${basePath}assets/`;
}
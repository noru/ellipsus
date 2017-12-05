#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_dist_files() {
  NPM_VER=$(npm version patch --no-git-tag-version)
  git add -A
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER: $NPM_VER [ci skip]"
}

push_files() {
  git remote add github https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG
  git push -u github master
  npm publish ./
}

setup_git
commit_dist_files
push_files
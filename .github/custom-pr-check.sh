#!/bin/bash

# Checks the alignment of the version declare on package.json, package-lock.json and the Dockerfile
# Doesn't take in account the SNAPSHOT tag
custom-pr-check() {
  local version_on_project_file="$(jq ".version" -r < package.json | sed 's/-SNAPSHOT*//gi')"
  local version_on_lock_file="$(jq ".version" -r < package-lock.json | sed 's/-SNAPSHOT*//gi')"
  local release_on_dockerfile="$(grep "release=" Dockerfile | sed "s/.*release=//" | sed 's/\\//' | sed 's/\"//g' | sed 's/-SNAPSHOT*//gi' | xargs)"
  local err=0
  
  if [ "$version_on_project_file" != "$version_on_lock_file" ]; then
    echo "ERROR: Version on project file is not aligned with lock-file" 1>&2
    err=1
  fi
  
  if [ "$version_on_project_file" != "$release_on_dockerfile" ]; then
  echo ",$version_on_project_file,$release_on_dockerfile,"
    echo "ERROR: Version on project file is not aligned with dockerfile" 1>&2
    err=1
  fi
  
  return "$err"
}

custom-pr-check "$@"

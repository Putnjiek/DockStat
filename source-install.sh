#!/bin/bash

echo ">>> Cloning Repositorries"
git clone https://github.com/its4nik/dockstat .
git clone https://github.com/its4nik/dockstatapi .
echo ">>> Done"
echo
echo ">>> Installing dependencies"
echo ">>> INFO: Frontend needs --force because I dont fucking know"
echo ">>> Installing Frontend dependencies"
cd ./dockstat && npm i --force
echo ">>> Done"
echo ">>> Installing backend dependencies"
cd ../dockstatapi && npm i
echo ">>> Done"
cd ..

echo
echo "
############################################################################################
### Thanks for installing DockStat!                                                      ###
###                                                                                      ###
### Please see the Wiki, on how to set things up from here:                              ###
### https://outline.itsnik.de/doc/installation-DaO99bB86q#h-build-from-source-production ### 
############################################################################################

exit 0
"

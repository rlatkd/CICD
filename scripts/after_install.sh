#!/bin/bash

cd /var/www/html
sudo mkdir build

echo ">>> install flask modules ***********************"
pip install --no-cache-dir -r requirements.txt


echo ">>> copy build results to web root directory ***"
mv -f ./build/* ./

echo ">>> remove template files & directories ********"
rm -rf build src scripts

echo '>>> change owner to ubuntu *********************'
chown -R ubuntu /var/www/html

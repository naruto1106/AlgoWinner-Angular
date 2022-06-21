
ENV=$(get_octopusvariable Octopus.Environment.Name)
echo "Environment is ${ENV}"
for file1 in html-env/*.${ENV}.html
do
  file2=${file1/.${ENV}./.}
  file2=${file2/html-env\//}  
  echo "move ${file1} to ${file2}"
  cp $file1 $file2
done

rm html-env/*
rm *.config
rm *.sh PreDeploy.ps1
sudo rsync -ar srcmap/ /var/www/srcmap.algomerchant.com/
rm -rf srcmap

lowerENV=$(echo $ENV | tr A-Z a-z)
[ "$lowerENV" = "production" ] && lowerENV=www
folder=/var/www/${lowerENV}.algowinner.com


# create directory if not exists
[ -d "${folder}" ] || sudo mkdir -p ${folder}

sudo rm -rf ${folder}/*
sudo mv * ${folder}/

sudo chown nginx:nginx -R ${folder}




echo START
echo building SIS-NIU-FRONTEND

# env DEV FAT UAT PRD
ENVIRONMENT=${1}
echo ENVIRONMENT : ${1}

gulp=node_modules/gulp/bin/gulp.js
echo $gulp

cd ./build
#gulp build -env FAT/UAT/PRD
for env in FAT UAT PRD
do
# node $gulp clean
#node $gulp build -env ${env}
#node $gulp copy_output -env ${env}
node $gulp mk_output -env ${env}
done

#按生产环境构建
node $gulp build -env PRD

#node $gulp mk_common
node $gulp copy_common

node $gulp archive_output


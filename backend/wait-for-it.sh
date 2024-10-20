#!/bin/sh
TIMEOUT=15
host="$1"
port="$2"
shift 2
for i in `seq $TIMEOUT` ; do
   nc -z $host $port > /dev/null 2>&1
   result=$?
   if [ $result -eq 0 ] ; then
      break
   fi
   echo "Waiting for $host:$port..."
   sleep 1
done

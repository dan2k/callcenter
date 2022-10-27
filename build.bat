@echo off
echo list file before update ........
ssh administrator@172.16.246.228 "ls -lat '/mnt/controldata/mpsicc/callcenter/client/'"
echo remove source on server ..........
ssh administrator@172.16.246.228 "rm -rf /mnt/controldata/mpsicc/callcenter/client/* "
ssh administrator@172.16.246.228 "ls -lat '/mnt/controldata/mpsicc/callcenter/client/'"
echo up source to server ..........
scp -r dist/* administrator@172.16.246.228:/mnt/controldata/mpsicc/callcenter/client/
echo +++ up load finish +++


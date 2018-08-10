start_docker="docker-compose up db"
start_server="yarn server"
trap 'kill %1' SIGINT
eval $start_docker & eval $start_server

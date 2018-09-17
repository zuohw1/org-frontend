#!groovy

def dockerRuntime(command) {
    def dockerImage = docker.image('hub.ihr.local/node:9.11-alpine')
    dockerArgs = '-u root ' + '--network=host ' +
        '-v /data/jenkins_home/.cache/yarn:/root/.cache/yarn ' +
        '-v /data/jenkins_home/workspace/${JOB_NAME}:/code -w /code'
    dockerImage.inside("${dockerArgs}") {
        sh "${command}"
    }
}

node {
    try {

        branch = "${version}"
        projectPath = "${PROJECT_NAME}/${SUB_PROJECT_NAME}"
        projectImage = "${registryUrl}/${projectPath}"

        currentBuild.result = 'SUCCESS'

        stage('Checkout') {
            // 代码提取
            git([url: "${codeUrl}/${projectPath}.git", branch: "${branch}", credentialsId: "${codeCredentialsId}"])
        }

        stage('Package Install') {
            // 通过docker插件运行项目构建
            dockerRuntime('yarn')
        }

        stage('Unit Test') {
            // 通过docker插件运行项目测试
            dockerRuntime('yarn jest')
        }

        stage('Code Analysis') {
            def sonarqubeScannerHome = tool name: 'SonarScanner'
            withSonarQubeEnv('SonarServer') {
                sh "${sonarqubeScannerHome}/bin/sonar-scanner"
            }
        }


        stage('Code Build') {
            dockerRuntime('node injector.js --env=production')
            // 通过docker插件运行项目构建
            dockerRuntime('PUBLIC_PATH=/authority-frontend/ BASE_URL=/authority-frontend yarn build')
        }

        stage('Docker Build') {
            // 变量判断获取gitlab分支, Docker打上分支tag
            if ("${branch}" == 'develop') {
                imagesTag = "${BUILD_ID}"
            } else {
                imagesTag = "${branch}"
            }
            // 构建Docker镜像,并传送到镜像服务器
            docker.build("${projectImage}:${imagesTag}").push()
        }

        stage('Deploy') {
            // 通过Marathon进行项目镜像部署
            marathon(
                url: "${marathonUrl}",
                credentialsId: "${marathonCredentialsId}",
                id: "/${projectPath}",
                docker: "${projectImage}:${imagesTag}",
                // Marathon在运行时是否强制重新pull镜像
                dockerForcePull: false,
                // 是否强制结束当前项目未完成的任务进行最新的部署
                forceUpdate: true,
                uris: [[uri: 'file:///share/docker/auth.tar.gz']],
                env: [[name: "TZ", value: "Asia/Shanghai"],
                      [name: "SPRING_PROFILES_ACTIVE", value: "stage"]],
                labels: [[name: 'HAPROXY_GROUP', value: 'unicom_ihr_test'],
                                                      [name: "HAPROXY_0_HTTP_BACKEND_PROXYPASS_PATH", value: "/${SUB_PROJECT_NAME}/"],
                                                      [name: "HAPROXY_0_VHOST", value: "10.0.210.93,10.0.210.94,10.0.210.95"],
                                                      [name: "HAPROXY_0_PATH", value: "/${SUB_PROJECT_NAME}/"]]
            )
        }
    }

    catch (e) {
        currentBuild.result = 'FAILURE'
        throw e
    }
    finally {
        // 构建结构邮件发送
        emailext subject: '${DEFAULT_SUBJECT}',
            body: '''${JELLY_SCRIPT,template="html"}''',
        recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']]
    }
}

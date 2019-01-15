const config = require('../../sub/auth.json');

module.exports.config = {
    strategy: require('passport-discord').Strategy,
    color: '#7289DA',
    fontColor: '#FFFFFF',
    vendor: 'discord',
    displayName: 'withDiscord'
}

module.exports.strategyConfig = {
    clientID: config.discord.clientID, // 보안을 위해서입니다.
    clientSecret: config.discord.clientSecret, // 이 방법을 사용하는 것을
    callbackURL: config.discord.callbackURL, // 적극 권장합니다.
    passReqToCallback: true,
    scope: "identify"
}

module.exports.strategy = (process, MainDB, Ajae) => {
    return (req, accessToken, refreshToken, profile, done) => {
        const $p = {};

        // var fullname = profile.username+"#"+profile.discriminator;

        $p.authType = "discord";
        $p.id = $p.authType+"-"+profile.id;
        $p.name = profile.username;
        $p.title = profile.username;
        $p.image = profile.avatar;

        process(req, accessToken, MainDB, $p, done);
    }
}
jQuery(document).ready(function () {
    jQuery('.nav.nav-pills > li').click(function () {
        jQuery('.nav.nav-pills > li').removeClass('active');
        jQuery(this).addClass('active');
    });

    jQuery('#btn_mam_save_gykey').click(function () {
        jQuery.ajax({
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: { 'kind': 'save_gy_key', 'key': jQuery('#mam_gy_key').val() },
            type: 'post',
            success: function (result) {
                if (result == "1") {
                    bs4pop.notice("Google Youtube API Key is valid.", { type: 'success', position: 'center' });
                } else {
                    bs4pop.notice("Invalid Google Youtube API Key", { type: 'warning', position: 'center' });
                }
            },
            error: function (xhr) {
                var error = xhr.responseJSON.error.message;
                bs4pop.notice("Google Youtube API Key: " + error + ".", { type: 'warning', position: 'center' });
            }
        });
    });

    jQuery('#btn_mam_save_bskey').click(function () {
        var bs_key = jQuery('#mam_bs_key').val();
        jQuery.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=laravel",
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", bs_key);
            },
            type: "GET",
            // Request body
            data: "",
            success: function (data) {
                jQuery.ajax({
                    url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                    data: { 'kind': 'save_bs_key', 'bs_key': jQuery('#mam_bs_key').val() },
                    type: 'post',
                    success: function (result) {
                        bs4pop.notice("Bing Search API Key is valid. Successfully saved.", { type: 'success', position: 'center' });
                        console.log(result);
                    },
                    error: function (xhr) {
                        var error = xhr.responseJSON.error.message;
                        bs4pop.notice("Bing Search Key: " + error + ".", { type: 'warning', position: 'center' });
                    }
                });
            },
            error: function (xhr) {
                bs4pop.notice("Bing Search Key: Invalid API Key or Out of date.", { type: 'warning', position: 'center' });
            }
        })

    });
    jQuery('#btn_mam_save_fbtoken').click(function () {
        var api_version = "v4.0";
        var page_name = jQuery('#fb_page_name').val();
        var access_token = jQuery('#fb_access_token').val();
        var base_url = "https://graph.facebook.com/" + api_version + "/";
        var account_url = base_url + "pages/search?q=" + page_name + "&access_token=" + access_token;
        jQuery.ajax({
            async: false,
            type: "get",
            url: account_url,
            success: function (result) {
                jQuery.ajax({
                    url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                    data: {
                        'kind': 'save_fb_token',
                        'fb_access_token': jQuery('#fb_access_token').val(),
                        'fb_page_name': jQuery('#fb_page_name').val()
                    },
                    type: 'post',
                    success: function (result) {
                        bs4pop.notice("Your facebook information is valid. Successfully saved.", { type: 'success', position: 'center' });
                        console.log(result);
                    }
                });
            },
            error: function (xhr) {
                var error = xhr.responseJSON.error.message;
                bs4pop.notice("Facebook: " + error + ".", { type: 'warning', position: 'center' });
            }
        })

    });
    jQuery('#btn_mam_save_pitoken').click(function () {
        var pi_keyword = jQuery('#pi_api_key').val();
        jQuery.ajax({
            url: 'https://api.pinterest.com/v1/me/pins/?access_token=' + pi_keyword,
            data: {},
            type: 'get',
            success: function (result) {
                bs4pop.notice("Pinterest: Access Token is valid.", { type: 'success', position: 'center' });
                jQuery.ajax({
                    url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                    data: {
                        'kind': 'save_pi_token',
                        'pi_api_key': jQuery('#pi_api_key').val(),
                        'pi_keyword': jQuery('#pi_keyword').val()
                    },
                    type: 'post',
                    success: function (result) {
                        console.log(result);
                    },
                    error: function (xhr) {
                        bs4pop.notice("Pinterest: " + xhr.responseText + ".", { type: 'warning', position: 'center' });
                    }
                });
            },
            error: function (xhr) {
                bs4pop.notice("Pinterest: Invalid Access Token", { type: 'warning', position: 'center' });
            }
        });

    });

    jQuery('#btn_mam_save_twtoken').click(function () {
        jQuery.ajax({
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: {
                'kind': 'save_tw_token',
                'tw_api_key': jQuery('#tw_api_key').val(),
                'tw_api_secret': jQuery('#tw_api_secret').val(),
                'tw_access_token': jQuery('#tw_access_token').val(),
                'tw_token_secret': jQuery('#tw_token_secret').val()
            },
            type: 'post',
            success: function (result) {
                if (result == "1") {
                    bs4pop.notice("Twitter auth information is valid. Successfully saved.", { type: 'success', position: 'center' });
                } else {
                    bs4pop.notice("Twitter: Invalid Twitter Information", { type: 'warning', position: 'center' });
                }
            },
            error: function (xhr) {
                bs4pop.notice("Twitter: " + xhr.responseText + ".", { type: 'warning', position: 'center' });
            }
        });
    });
    jQuery('#btn_mam_save_fltoken').click(function () {
        jQuery.ajax({
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: {
                'kind': 'save_fl_token',
                'fl_api_key': jQuery('#fl_api_key').val()
            },
            type: 'post',
            success: function (result) {
                if (result) {
                    bs4pop.notice("Flickr: " + result, { type: 'warning', position: 'center' });
                } else {
                    bs4pop.notice("Flickr API Key is valid. Successfully saved.", { type: 'success', position: 'center' });
                }
            },
            error: function (xhr) {
                var error = xhr.responseJSON.error.message;
                bs4pop.notice("Flickr: " + error + ".", { type: 'warning', position: 'center' });
            }
        });
    });

    jQuery('#btn_mam_save_setting').click(function () {
        data = {
            'kind': 'save_setting',
            'cron_interval': jQuery('#cron_interval').val(),
            'related_limit': jQuery('#related_limit').val(),
            'rss_limit': jQuery('#rss_limit').val(),
            'facebook_limit': jQuery('#facebook_limit').val(),
            'twitter_limit': jQuery('#twitter_limit').val(),
            'flickr_limit': jQuery('#flickr_limit').val(),
            'pinterest_limit': jQuery('#pinterest_limit').val(),
        }
        jQuery.ajax({
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: data,
            type: 'post',
            success: function (result) {
                console.log(result);
            }
        });
    });

    jQuery('.mam_template_list_item').click(function () {
        jQuery('.mam_template_list_item').removeClass('active');
        jQuery(this).addClass('active');
        jQuery.ajax({
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: { 'kind': 'show_temp', 'temp_name': jQuery(this).text() },
            type: 'post',
            success: function (result) {
                jQuery('.mam_template_list_content').val(result);
            }
        })
    });

    jQuery('#btn_mam_create_template').click(function () {
        var temp_name = jQuery('#mam_template_name').val();
        var temp_content = jQuery('#mam_template_content').val();
        jQuery.ajax({
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: { 'kind': 'create_temp', 'temp_name': temp_name, 'temp_content': temp_content },
            type: 'post',
            success: function (result) {
                console.log(result);
                var temp_list = document.createElement('a');
                jQuery(temp_list).addClass('mam_template_list_item list-group-item list-group-item-action');
                jQuery(temp_list).text(temp_name);
                jQuery(temp_list).click(function () {
                    jQuery('.mam_template_list_item').removeClass('active');
                    jQuery(this).addClass('active');
                    jQuery.ajax({
                        url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                        data: { 'kind': 'show_temp', 'temp_name': jQuery(this).text() },
                        type: 'post',
                        success: function (result) {
                            jQuery('.mam_template_list_content').val(result);
                        },
                    })
                });
                jQuery('.mam_template_list').append(temp_list);

                var opt_temp = document.createElement('option');
                jQuery(opt_temp).text(temp_name);
                jQuery('#selected_template_name').append(opt_temp);
                jQuery('#mam_template_name').val('');
                jQuery('#mam_template_content').val('');
            }
        });
    })
    const import_txt = document.getElementById('mam_keywords_file');
    if (import_txt) {
        import_txt.addEventListener('change', e => {
            const reader = new FileReader()

            reader.onload = event => {
                const text = reader.result;
                jQuery('#mam_camp_keyword_list').val(text)
            }

            reader.onerror = (e) => {
                console.error(e)
            }

            reader.readAsText(import_txt.files[0])
        })
    }

    jQuery('#btn_keywords_import').click(function () {
        jQuery('#mam_keywords_file').click();
    })
    jQuery('#btn_keywords_import').click(function () {
        create_data = {
            kind: 'test',
        };
        jQuery.ajax({
            type: 'post',
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: create_data,
            success: function (result) {
                console.log(result);
            }
        })

    })

    jQuery('#btn_mam_create_camp').click(function () {
        mamCreateCampaign(0);
    });

    jQuery('#btn_mam_create_camp_cron').click(function () {
        var cron_interval = jQuery('#cron_interval').val();
        if (!cron_interval) {
            bs4pop.alert('Please input INTERVAL OF CRON JOB in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        mamCreateCampaign(cron_interval);
    });

    function mamCreateCampaign(interval) {
        var related_limit = jQuery('#related_limit').val();
        if (!related_limit.trim()) {
            bs4pop.alert('Please input LIMIT OF RELATED KEYWORDS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var rss_limit = jQuery('#rss_limit').val();
        if (!rss_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF RSS POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var facebook_limit = jQuery('#facebook_limit').val();
        if (!facebook_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF Facebook POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var twitter_limit = jQuery('#twitter_limit').val();
        if (!twitter_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF Twitter POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var flickr_limit = jQuery('#flickr_limit').val();
        if (!flickr_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF Flickr POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var pinterest_limit = jQuery('#pinterest_limit').val();
        if (!pinterest_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF Pinterest POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var camp_name = jQuery('#mam_camp_name').val();
        if (!camp_name.trim()) {
            bs4pop.alert('Please input Name of Campaign.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var keyword_list = jQuery('#mam_camp_keyword_list').val();
        if (!keyword_list.trim()) {
            bs4pop.alert('Please input Keyword List of Campaign.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var bs_key = jQuery('#mam_bs_key').val();
        if (!bs_key.trim()) {
            bs4pop.alert('Please input Bing Azure api for Related Keywords in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var gy_key = jQuery('#mam_gy_key').val();
        if (!gy_key.trim()) {
            bs4pop.alert('Please input Google api Key for Youtube in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var fb_access_token = jQuery('#fb_access_token').val();
        if (!fb_access_token.trim()) {
            bs4pop.alert('Please input Facebook Access Token in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var fb_page_name = jQuery('#fb_page_name').val();
        if (!fb_page_name.trim()) {
            bs4pop.alert('Please input Facebook Page Name in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var tw_api_key = jQuery('#tw_api_key').val();
        if (!tw_api_key.trim()) {
            bs4pop.alert('Please input Twitter Consumer Key in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var tw_api_secret = jQuery('#tw_api_secret').val();
        if (!tw_api_secret.trim()) {
            bs4pop.alert('Please input Twitter Consumer Secret in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var tw_access_token = jQuery('#tw_access_token').val();
        if (!tw_access_token.trim()) {
            bs4pop.alert('Please input Twitter Access Token in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var tw_token_secret = jQuery('#tw_token_secret').val();
        if (!tw_token_secret.trim()) {
            bs4pop.alert('Please input Twitter Access Token Secret in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var fl_api_key = jQuery('#fl_api_key').val();
        if (!fl_api_key.trim()) {
            bs4pop.alert('Please input Flickr Api Key in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var pi_api_key = jQuery('#pi_api_key').val();
        if (!pi_api_key.trim()) {
            bs4pop.alert('Please input Pinterest Api Key in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var pi_keyword = jQuery('#pi_keyword').val();
        if (!pi_keyword.trim()) {
            bs4pop.alert('Please input Pinterest Keyword in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var flag_fl = Number(jQuery('#mam_delete_firstline').next().css('color') == "rgb(61, 183, 217)");
        var flag_ll = Number(jQuery('#mam_delete_lastline').next().css('color') == "rgb(61, 183, 217)");
        jQuery('.mam_camp_success_alert').hide();
        jQuery('.mam_campain_progress_box').show();
        jQuery('.mam_campaign_progress_bar').width("10%");
        jQuery('.mam_campaign_progress_bar').text("10%");

        var tw_info = {
            'tw_api_key': tw_api_key,
            'tw_api_secret': tw_api_secret,
            'tw_access_token': tw_access_token,
            'tw_token_secret': tw_token_secret
        };

        var pi_info = {
            'pi_api_key': pi_api_key,
            'pi_keyword': pi_keyword
        }

        var fb_content = getFacebookPosts(fb_access_token, fb_page_name, facebook_limit);
        var temp_name = jQuery('#selected_template_name').val();
        var keyword_arr1 = keyword_list.split("\n");
        var keyword_arr = new Array();
        for (var keyword of keyword_arr1) {
            if (keyword.trim() != '')
                keyword_arr.push(keyword);
        }
        var count = keyword_arr.length;
        var success_count = 0;
        var fail_count = 0;

        function myGetYoutube(n) {
            if (n < 0) return;
            jQuery.ajax({
                url: '../wp-content/plugins/mass-api-manager/youtube_caption_scrapper.php',
                data: {
                    'kind': 'create_camp',
                    'camp_name': camp_name,
                    'keyword': keyword_arr[n],
                    'temp_name': temp_name,
                    'flag_fl': flag_fl,
                    'flag_ll': flag_ll
                },
                type: 'post',
                success: function (result) {
                    result = JSON.parse(result);
                    var title = result.title;
                    var video_id = result.video_id;
                    var caption = result.caption;
                    var tags = result.tags;
                    var thumbnail = result.thumbnail;
                    var comments = result.comments;
                    var temp_content = result.temp_content;
                    var image_arr = [];
                    var rel_keyword_arr = [];
                    var params = {
                        // Request parameters
                        "q": keyword_arr[n]
                    };
                    jQuery.ajax({
                        url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?" + jQuery.param(params),
                        beforeSend: function (xhrObj) {
                            // Request headers
                            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", bs_key);
                        },
                        type: "GET",
                        // Request body
                        data: "",
                        success: function (data) {
                            console.log(data);
                            items = data['value'];
                            items.forEach(element => {
                                var url = element.contentUrl;
                                var rel_keyword = element.name;
                                if (rel_keyword_arr.indexOf(rel_keyword) == -1)
                                    rel_keyword_arr.push(rel_keyword);
                                image_arr.push(url);
                            });
                            image_arr = image_arr.slice(0, related_limit);
                            rel_keyword_arr = rel_keyword_arr.slice(0, related_limit);
                            youtube_process(title, video_id, caption, tags, thumbnail, comments, temp_content, image_arr, rel_keyword_arr);
                        },
                        error: function (xhr) {
                            var error = xhr.responseJSON.error.message;
                            sendLog("Bing Search: " + error + ".");
                            youtube_process(title, video_id, caption, tags, thumbnail, comments, temp_content, image_arr, rel_keyword_arr);
                        }
                    })
                    function youtube_process(title, video_id, caption, tags, thumbnail, comments, temp_content, image_arr, rel_keyword_arr) {
                        if (caption != '') {
                            var video_id = video_id;
                            var content = temp_content;
                            var category = jQuery('#mam_post_category').val();
                            var video = "[mam_video id=" + video_id + "]";
                            var bing_img = "[mam_bing_images id=" + image_arr + "]"
                            var rel_key_result = "";
                            rel_keyword_arr.forEach(element => {
                                rel_key_result += "<p>" + element + "</p>"
                            });

                            content = content.replace("[Youtube Video]", video);
                            content = content.replace("[Captions]", caption);
                            content = content.replace("[Images]", bing_img);
                            content = content.replace("[Related Keywords]", rel_key_result);
                            content = content.replace("[facebook]", fb_content);

                            var status = "publish";
                            var mamPostData = {
                                "kind": 'create_post', "title": title, "content": content,
                                "status": status, "tags": tags, "category": category,
                                "comments": comments, "thumbnail": thumbnail, "rss_limit": rss_limit,
                                "tw_info": tw_info, "pi_info": pi_info, "fl_api_key": fl_api_key, 
                                "twitter_limit": twitter_limit, "flickr_limit": flickr_limit, 
                                "pinterest_limit": pinterest_limit, 
                            };

                            jQuery.ajax({
                                url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                                data: mamPostData,
                                type: 'post',
                                success: function (result) {
                                    console.log(result);
                                    success_count++;
                                    var percent = 100 * (success_count + fail_count) / count;
                                    jQuery('.mam_campaign_progress_bar').width(percent + "%");
                                    jQuery('.mam_campaign_progress_bar').text(percent + "%");
                                    show_progress_bar(keyword_arr[n], 1);
                                },
                                error: function (xhr) {
                                    var error = xhr.responseJSON.error.message;
                                    sendLog("Post: " + error + ".");
                                    fail_count++;
                                    show_progress_bar(keyword_arr[n], 0);
                                }
                            })
                        } else {
                            fail_count++;
                            var percent = 100 * (success_count + fail_count) / count;
                            jQuery('.mam_campaign_progress_bar').width(percent + "%");
                            jQuery('.mam_campaign_progress_bar').text(percent + "%");
                        }
                        show_progress_bar();
                        setTimeout(function () {
                            myGetYoutube(n - 1);
                        }, interval * 60 * 1000);
                    }
                },
                error: function (xhr) {
                    var error = xhr.responseJSON.error.message;
                    sendLog("Post: " + error + ".");
                    fail_count++;
                    show_progress_bar(keyword_arr[n], 0);
                    setTimeout(function () {
                        myGetYoutube(n - 1);
                    }, interval * 60 * 1000);
                }
            });
        }
        myGetYoutube(count - 1);
        function show_progress_bar(str, flag) {
            if ((success_count + fail_count) == count) {
                if (str) {
                    create_data = {
                        kind: 'create_camp',
                        camp_name: camp_name,
                        total_posts: success_count,
                        count: count,
                        keyword: str,
                        flag: flag
                    };
                } else {
                    create_data = {
                        kind: 'create_camp',
                        camp_name: camp_name,
                        total_posts: success_count,
                        count: count
                    };
                }
                jQuery.ajax({
                    type: 'post',
                    url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                    data: create_data,
                    success: function (result) {
                        var result = JSON.parse(result);
                        var campaigns = result['campaigns'];
                        var logs = result['logs'];
                        var tbody = "";
                        campaigns.forEach(element => {
                            tbody += "<tr>" +
                                "<td>" + element["name"] + "</td>" +
                                "<td>" + element["create_date"] + "</td>" +
                                "<td>" + element["create_date"] + "</td>" +
                                "<td>" + element["status"] + "</td>" +
                                "<td>" + element["keywords"] + "</td>" +
                                "<td>" + element["total_posts"] + "</td>" +
                                "<td>" + element["last_error"] + "</td>" +
                                "</tr>";
                        })
                        jQuery('#camp_table_body').html(tbody);
                        var tbody1 = "";
                        logs.forEach(element => {
                            tbody1 += "<tr>" +
                                "<td>" + element["id"] + "</td>" +
                                "<td>" + element["log"] + "</td>" +
                                "<td>" + element["create_date"] + "</td>" +
                                "</tr>";
                        })
                        jQuery('#log_table_body').html(tbody1);
                    }
                })
                jQuery('.mam_campaign_spinner_box').hide();
                jQuery('.mam_campain_progress_box').hide();
                jQuery('.mam_camp_success_alert').html('<strong>Completed!</strong><span class="badge badge-success">' + success_count + '</span>' + " posts are created."
                    + '<span class="badge badge-warning">' + fail_count + '</span>' + " keywords are failed.");
                jQuery('.mam_camp_success_alert').show();
            }
        }
    }

    function getFacebookPosts(access_token, page_name, count) {
        var api_version = "v4.0";
        var base_url = "https://graph.facebook.com/" + api_version + "/";
        var account_url = base_url + "pages/search?q=" + page_name + "&access_token=" + access_token;
        var page_id;
        jQuery.ajax({
            async: false,
            type: "get",
            url: account_url,
            success: function (result) {
                var items = result["data"];
                page_id = items[0]["id"];
            },
            error: function (xhr) {
                var error = xhr.responseJSON.error.message;
                sendLog("Facebook: " + error + ".");
            }
        })
        var fb_container = "";
        if (page_id) {
            var post_url = base_url + page_id + "/feed?posts&limit=" + count + "&access_token=";
            fb_container = "<div class='fb_container row'>";
            jQuery.ajax({
                async: false,
                type: "get",
                data: {},
                url: post_url + access_token,
                success: function (result) {
                    var items = result["data"];
                    items.forEach(element => {
                        fb_container += "<div class='mam_show_item col-md-12'>";
                        var message = element["message"] != undefined ? element["message"] : "";
                        var story = element["story"] != undefined ? element["story"] : page_name;
                        var post_date = element["created_time"];
                        var fb_post_id = element["id"];
                        jQuery.ajax({
                            type: "get",
                            data: {},
                            async: false,
                            url: base_url + fb_post_id + "/attachments?access_token=" + access_token,
                            success: function (result) {
                                var data = result["data"][0];
                                if (data) {
                                    var img_url = "";
                                    if (data["subattachments"])
                                        img_url = data["subattachments"]["data"][0]["media"] != undefined ? data["subattachments"]["data"][0]["media"]["image"]["src"] : '';
                                    else if (data["media"]["image"]["src"])
                                        img_url = data["media"] != undefined ? data["media"]["image"]["src"] : '';
                                    var target_url = data["target"]["url"];

                                    fb_container += '<div class="mam-icon-spacer"></div>' +
                                        '<div class="mam-icon-wrap">' +
                                        '<div class="mam_item_user_name row">' +
                                        '<div class="col-md-8 mam_name_left">' +
                                        '<a href="' + target_url + '">' + story + '</a><br>' +
                                        '<span class="mam_item_post_time">' + post_date + '</span>' +
                                        '</div>' +
                                        '<div class="col-md-4 mam_name_right">' +
                                        '<a href="' + target_url + '" target="_blank">' +
                                        '<i class="flaticon-facebook"></i>' +
                                        '</a>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<br>' +
                                        '<div class="mam_item_description">' +
                                        urlify(message) +
                                        '</div>' +
                                        '<div class="mam_item_image">' +
                                        '<a href="' + target_url + '" class="" target="_blank">' +
                                        '<img class="mam_item_description_image" src="' + img_url + '">' +
                                        '</a>' +
                                        '</div>';
                                }
                            },
                            error: function (xhr) {
                                var error = xhr.responseJSON.error.message;
                                sendLog("Facebook: " + error + ".");
                                fb_container = '';
                            }
                        })
                        fb_container += "</div>";
                    });
                },
                error: function (xhr) {
                    var error = xhr.responseJSON.error.message;
                    sendLog("Facebook: " + error + ".");
                    fb_container = '';
                }
            })
            fb_container += "</div>";
        }
        return fb_container;
    }

    function sendLog(log) {
        jQuery.ajax({
            type: 'post',
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: { 'kind': 'send_log', 'log': log },
            success: function (result) {
                console.log(result);
            }
        })
    }

    function urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            return '<a href="' + url + '">' + url + '</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }
});


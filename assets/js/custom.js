jQuery(document).ready(function ($) {
    $('.nav.nav-pills > li').click(function () {
        $('.nav.nav-pills > li').removeClass('active');
        $(this).addClass('active');
    });

    $('#btn_mam_save_gykey').click(function () {
        $.ajax({
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: { 'kind': 'save_gy_key', 'key': $('#mam_gy_key').val() },
            type: 'post',
            success: function (result) {
                if (result == "1") {
                    bs4pop.notice("Google Youtube API Key is valid.", { type: 'success', position: 'center' });
                } else {
                    bs4pop.notice("Invalid Google Youtube API Key", { type: 'warning', position: 'center' });
                }
            },
            error: function (xhr) {
                var error = xhr.responseText;
                bs4pop.notice("Google Youtube API Key: " + error + ".", { type: 'warning', position: 'center' });
            }
        });
    });

    $('#btn_mam_save_bskey').click(function () {
        var bs_key = $('#mam_bs_key').val();
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=laravel",
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", bs_key);
            },
            type: "GET",
            // Request body
            data: "",
            success: function (data) {
                $.ajax({
                    url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                    data: { 'kind': 'save_bs_key', 'bs_key': $('#mam_bs_key').val() },
                    type: 'post',
                    success: function (result) {
                        bs4pop.notice("Bing Search API Key is valid. Successfully saved.", { type: 'success', position: 'center' });
                        console.log(result);
                    },
                    error: function (xhr) {
                        var error = xhr.responseText;
                        bs4pop.notice("Bing Search Key: " + error + ".", { type: 'warning', position: 'center' });
                    }
                });
            },
            error: function (xhr) {
                bs4pop.notice("Bing Search Key: Invalid API Key or Out of date.", { type: 'warning', position: 'center' });
            }
        })

    });
    $('#btn_mam_save_fbtoken').click(function () {
        var api_version = "v4.0";
        var page_name = $('#fb_page_name').val();
        var access_token = $('#fb_access_token').val();
        var base_url = "https://graph.facebook.com/" + api_version + "/";
        var account_url = base_url + "pages/search?q=" + page_name + "&access_token=" + access_token;
        $.ajax({
            async: false,
            type: "get",
            url: account_url,
            success: function (result) {
                $.ajax({
                    url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                    data: {
                        'kind': 'save_fb_token',
                        'fb_access_token': $('#fb_access_token').val(),
                        'fb_page_name': $('#fb_page_name').val()
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
    $('#btn_mam_save_pitoken').click(function () {
        var pi_keyword = $('#pi_api_key').val();
        $.ajax({
            url: 'https://api.pinterest.com/v1/me/pins/?access_token=' + pi_keyword,
            data: {},
            type: 'get',
            success: function (result) {
                bs4pop.notice("Pinterest: Access Token is valid.", { type: 'success', position: 'center' });
                $.ajax({
                    url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                    data: {
                        'kind': 'save_pi_token',
                        'pi_api_key': $('#pi_api_key').val(),
                        'pi_keyword': $('#pi_keyword').val()
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

    $('#btn_mam_save_twtoken').click(function () {
        $.ajax({
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: {
                'kind': 'save_tw_token',
                'tw_api_key': $('#tw_api_key').val(),
                'tw_api_secret': $('#tw_api_secret').val(),
                'tw_access_token': $('#tw_access_token').val(),
                'tw_token_secret': $('#tw_token_secret').val()
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
    $('#btn_mam_save_fltoken').click(function () {
        $.ajax({
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: {
                'kind': 'save_fl_token',
                'fl_api_key': $('#fl_api_key').val()
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
                var error = xhr.responseText;
                bs4pop.notice("Flickr: " + error + ".", { type: 'warning', position: 'center' });
            }
        });
    });

    $('#btn_mam_save_setting').click(function () {
        data = {
            'kind': 'save_setting',
            'cron_interval': $('#cron_interval').val(),
            'related_limit': $('#related_limit').val(),
            'rss_limit': $('#rss_limit').val(),
            'facebook_limit': $('#facebook_limit').val(),
            'twitter_limit': $('#twitter_limit').val(),
            'flickr_limit': $('#flickr_limit').val(),
            'pinterest_limit': $('#pinterest_limit').val(),
            'del_fl_flag': $('#mam_delete_firstline').attr('checked') == "checked" ? 1 : 0,
            'del_ll_flag': $('#mam_delete_lastline').attr('checked') == "checked" ? 1 : 0,
            'enable_related_keywords': $('#mam_enable_related_keywords').attr('checked') == "checked" ? 1 : 0,
            'enable_rss': $('#mam_enable_rss').attr('checked') == "checked" ? 1 : 0,
            'enable_facebook': $('#mam_enable_facebook').attr('checked') == "checked" ? 1 : 0,
            'enable_twitter': $('#mam_enable_twitter').attr('checked') == "checked" ? 1 : 0,
            'enable_flickr': $('#mam_enable_flickr').attr('checked') == "checked" ? 1 : 0,
            'enable_pinterest': $('#mam_enable_pinterest').attr('checked') == "checked" ? 1 : 0,
        }
        $.ajax({
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: data,
            type: 'post',
            success: function (result) {
                console.log(result);
                bs4pop.notice("Successcully saved.", { type: 'success', position: 'center' });
            }
        });
    });

    $('.mam_template_list_item').click(function () {
        $('.mam_template_list_item').removeClass('active');
        $(this).addClass('active');
        $.ajax({
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: { 'kind': 'show_temp', 'temp_name': $(this).text() },
            type: 'post',
            success: function (result) {
                $('.mam_template_list_content').val(result);
            }
        })
    });
    $('.mam_template_list_item .flaticon-tool_delete').click(function () {
        var temp_name = $(this).parent().text().trim();
        var temp_elem = $(this).parent();
        bs4pop.dialog({
            title: 'Delete Template',
            content: 'Are you sure you want to delete this template?',
            closeBtn: true,
            backdrop: 'static',
            btns: [
                {
                    label: 'Okay', className: 'btn-primary', onClick(cb) {
                        $(temp_elem).remove();
                        $.ajax({
                            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                            data: { 'kind': 'delete_temp', 'temp_name': temp_name },
                            type: 'post',
                            success: function (result) {
                                bs4pop.notice("Successfully deleted.", { type: 'success', position: 'center' });
                            }
                        })
                    }
                },
                { label: 'Cancel', className: 'btn-default', onClick(cb) { } }
            ],
        });
    })
    $('#btn_mam_create_template').click(function () {
        var temp_name = $('#mam_template_name').val();
        var temp_content = $('#mam_template_content').val();
        if (temp_name.trim() == '')
            bs4pop.notice("Please input Template name.", { type: 'warning', position: 'center' });
        else if (temp_content.trim() == '')
            bs4pop.notice("Please input Template content.", { type: 'warning', position: 'center' });
        else {
            $.ajax({
                url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                data: { 'kind': 'create_temp', 'temp_name': temp_name, 'temp_content': temp_content },
                type: 'post',
                success: function (result) {
                    if (result != '') {
                        var temp_list = document.createElement('a');
                        var temp_del = document.createElement('i');
                        $(temp_del).addClass('flaticon-tool_delete');
                        $(temp_list).addClass('mam_template_list_item list-group-item list-group-item-action');
                        $(temp_list).text(temp_name);
                        $(temp_list).append(temp_del);
                        $(temp_list).click(function () {
                            $('.mam_template_list_item').removeClass('active');
                            $(this).addClass('active');
                            $.ajax({
                                url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                                data: { 'kind': 'show_temp', 'temp_name': $(this).text() },
                                type: 'post',
                                success: function (result) {
                                    $('.mam_template_list_content').val(result);
                                },
                            })
                        });
                        $(temp_del).click(function () {
                            var temp_name = $(this).parent().text().trim();
                            var temp_elem = $(this).parent();
                            bs4pop.dialog({
                                title: 'Delete Template',
                                content: 'Are you sure you want to delete this template?',
                                closeBtn: true,
                                backdrop: 'static',
                                btns: [
                                    {
                                        label: 'Okay', className: 'btn-primary', onClick(cb) {
                                            $(temp_elem).remove();
                                            $.ajax({
                                                url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                                                data: { 'kind': 'delete_temp', 'temp_name': temp_name },
                                                type: 'post',
                                                success: function (result) {
                                                    bs4pop.notice("Successfully deleted.", { type: 'success', position: 'center' });
                                                }
                                            })
                                        }
                                    },
                                    { label: 'Cancel', className: 'btn-default', onClick(cb) { } }
                                ],
                            });
                        })
                        $('.mam_template_list').append(temp_list);
                        bs4pop.notice("Successfully created.", { type: 'success', position: 'center' });

                        var opt_temp = document.createElement('option');
                        $(opt_temp).text(temp_name);
                        $('#selected_template_name').append(opt_temp);
                        $('#mam_template_name').val('');
                        $('#mam_template_content').val('');
                    } else {
                        bs4pop.notice("Please reinput Template name. Current name exists.", { type: 'warning', position: 'center' });
                    }
                }
            });
        }
    })
    const import_txt = document.getElementById('mam_keywords_file');
    if (import_txt) {
        import_txt.addEventListener('change', e => {
            const reader = new FileReader()

            reader.onload = event => {
                const text = reader.result;
                $('#mam_camp_keyword_list').val(text)
            }

            reader.onerror = (e) => {
                console.error(e)
            }

            reader.readAsText(import_txt.files[0])
        })
    }

    $('#btn_keywords_import').click(function () {
        $('#mam_keywords_file').click();
    })
    $('#btn_keywords_import').click(function () {
        create_data = {
            kind: 'test',
        };
        $.ajax({
            type: 'post',
            url: '../wp-content/plugins/mass-api-manager/mam_request.php',
            data: create_data,
            success: function (result) {
                console.log(result);
            }
        })

    })

    function change_keyword(content, title) {
        var pos;
        while ((pos = content.indexOf("[keyword]")) != -1) {
            var after = content.substr(pos);
            var end_pos = after.indexOf("\n");
            var search_str = content.substr(pos, end_pos);
            content = content.replace(search_str, "<h1>" + title + search_str.substr(9) + "</h1>");/////////////???????????????????????????????????????????????????????????????
        }
        return content;
    }
    $('#btn_mam_create_video').click(function () {
        var related_limit = $('#related_limit').val();
        if (!related_limit.trim()) {
            bs4pop.alert('Please input LIMIT OF RELATED KEYWORDS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var rss_limit = $('#rss_limit').val();
        if (!rss_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF RSS POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var facebook_limit = $('#facebook_limit').val();
        if (!facebook_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF Facebook POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var twitter_limit = $('#twitter_limit').val();
        if (!twitter_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF Twitter POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var flickr_limit = $('#flickr_limit').val();
        if (!flickr_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF Flickr POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var pinterest_limit = $('#pinterest_limit').val();
        if (!pinterest_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF Pinterest POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var bs_key = $('#mam_bs_key').val();
        if (!bs_key.trim()) {
            bs4pop.alert('Please input Bing Azure api for Related Keywords in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var gy_key = $('#mam_gy_key').val();
        if (!gy_key.trim()) {
            bs4pop.alert('Please input Google api Key for Youtube in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var fb_access_token = $('#fb_access_token').val();
        if (!fb_access_token.trim()) {
            bs4pop.alert('Please input Facebook Access Token in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var tw_api_key = $('#tw_api_key').val();
        if (!tw_api_key.trim()) {
            bs4pop.alert('Please input Twitter Consumer Key in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var tw_api_secret = $('#tw_api_secret').val();
        if (!tw_api_secret.trim()) {
            bs4pop.alert('Please input Twitter Consumer Secret in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var tw_access_token = $('#tw_access_token').val();
        if (!tw_access_token.trim()) {
            bs4pop.alert('Please input Twitter Access Token in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var tw_token_secret = $('#tw_token_secret').val();
        if (!tw_token_secret.trim()) {
            bs4pop.alert('Please input Twitter Access Token Secret in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var fl_api_key = $('#fl_api_key').val();
        if (!fl_api_key.trim()) {
            bs4pop.alert('Please input Flickr Api Key in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var pi_api_key = $('#pi_api_key').val();
        if (!pi_api_key.trim()) {
            bs4pop.alert('Please input Pinterest Api Key in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var flag_fl = Number($('#mam_delete_firstline').next().css('color') == "rgb(61, 183, 217)");
        var flag_ll = Number($('#mam_delete_lastline').next().css('color') == "rgb(61, 183, 217)");
        var enable_related_keywords = $('#mam_enable_related_keywords').attr('checked') == "checked" ? 1 : 0;
        var enable_rss = $('#mam_enable_rss').attr('checked') == "checked" ? 1 : 0;
        var enable_facebook = $('#mam_enable_facebook').attr('checked') == "checked" ? 1 : 0;
        var enable_twitter = $('#mam_enable_twitter').attr('checked') == "checked" ? 1 : 0;
        var enable_flickr = $('#mam_enable_flickr').attr('checked') == "checked" ? 1 : 0;
        var enable_pinterest = $('#mam_enable_pinterest').attr('checked') == "checked" ? 1 : 0;

        var url = $('#mam_video_url').val().trim();
        if (!url) {
            bs4pop.alert('Please input Video URL.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var keyword = $('#mam_video_keyword').val().trim();
        if (!keyword) {
            bs4pop.alert('Please input Keyword.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var video_id = url.split('v=')[1];
        if (video_id == undefined) {
            bs4pop.alert('Please input valid Youtube URL.', function () { console.log('You Clicked Okay'); return; });
            return;
        } else if (!(video_id.trim())) {
            bs4pop.alert('Please input valid Youtube URL.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        $('.mam_video_spinner_box').show();

        var pi_keyword = keyword;
        var fb_page_name = keyword;
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

        var fb_content = enable_facebook ? getFacebookPosts(fb_access_token, fb_page_name, facebook_limit) : '';
        var temp_name = $('#selected_video_template_name').val();

        $.ajax({
            url: '../wp-content/plugins/mass-api-manager/youtube_caption_scrapper.php',
            data: {
                'kind': 'create_video',
                'video_id': video_id,
                'temp_name': temp_name,
                'flag_fl': flag_fl,
                'flag_ll': flag_ll
            },
            type: 'post',
            success: function (result) {
                result = JSON.parse(result);
                var caption = result.caption;
                var title = result.title;
                var tags = result.tags;
                var thumbnail = result.thumbnail;
                var comments = result.comments;
                var temp_content = result.temp_content;
                var image_arr = [];
                var rel_keyword_arr = [];
                var params = {
                    // Request parameters
                    "q": keyword
                };
                if (enable_rss) {
                    $.ajax({
                        url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?" + $.param(params),
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
                            video_process(title, video_id, caption, tags, thumbnail, comments, temp_content, image_arr, rel_keyword_arr, keyword);
                        },
                        error: function (xhr) {
                            var error = xhr.responseText;
                            sendLog("Bing Search: " + error + ".");
                            video_process(title, video_id, caption, tags, thumbnail, comments, temp_content, image_arr, rel_keyword_arr, keyword);
                        }
                    })
                } else {
                    video_process(title, video_id, caption, tags, thumbnail, comments, temp_content, image_arr, rel_keyword_arr, keyword);
                }
                function video_process(title, video_id, caption, tags, thumbnail, comments, temp_content, image_arr, rel_keyword_arr, keyword) {
                    var video_id = video_id;
                    var content = temp_content;
                    var category = $('#mam_video_post_category').val();
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
                    content = change_keyword(content, title);

                    var status = "publish";
                    var mamPostData = {
                        "kind": 'create_post', "title": title, "content": content,
                        "status": status, "tags": tags, "category": category,
                        "comments": comments, "thumbnail": thumbnail, "rss_limit": rss_limit,
                        "tw_info": tw_info, "pi_info": pi_info, "fl_api_key": fl_api_key,
                        "twitter_limit": twitter_limit, "flickr_limit": flickr_limit,
                        "pinterest_limit": pinterest_limit, "keyword": keyword, 
                        "enable_twitter": enable_twitter,
                        "enable_flickr": enable_flickr, "enable_pinterest": enable_pinterest
                    };

                    $.ajax({
                        url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                        data: mamPostData,
                        type: 'post',
                        success: function (result) {
                            $('.mam_video_spinner_box').hide();
                            bs4pop.alert('Successfully created.', function () { console.log('You Clicked Okay'); return; });
                        },
                        error: function (xhr) {
                            var error = xhr.responseText;
                            sendLog("Post: " + error + ".");
                            $('.mam_video_spinner_box').hide();
                            bs4pop.alert('Creation failed.', function () { console.log('You Clicked Okay'); return; });
                        }
                    })
                }
            },
            error: function (xhr) {
                var error = xhr.responseText;
                sendLog("Post: " + error + ".");
                $('.mam_video_spinner_box').hide();
                bs4pop.alert('Creation failed.', function () { console.log('You Clicked Okay'); return; });
            }
        });

    })

    $('#btn_mam_create_camp').click(function () {
        mamCreateCampaign(0);
    });

    $('#btn_mam_create_camp_cron').click(function () {
        var cron_interval = $('#cron_interval').val();
        if (!cron_interval) {
            bs4pop.alert('Please input INTERVAL OF CRON JOB in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        mamCreateCampaign(cron_interval);
    });

    function mamCreateCampaign(interval) {
        var related_limit = $('#related_limit').val();
        if (!related_limit.trim()) {
            bs4pop.alert('Please input LIMIT OF RELATED KEYWORDS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var rss_limit = $('#rss_limit').val();
        if (!rss_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF RSS POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var facebook_limit = $('#facebook_limit').val();
        if (!facebook_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF Facebook POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var twitter_limit = $('#twitter_limit').val();
        if (!twitter_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF Twitter POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var flickr_limit = $('#flickr_limit').val();
        if (!flickr_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF Flickr POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var pinterest_limit = $('#pinterest_limit').val();
        if (!pinterest_limit.trim()) {
            bs4pop.alert('Please input LIMIT NUMBER OF Pinterest POSTS in SETTINGS', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var camp_name = $('#mam_camp_name').val();
        if (!camp_name.trim()) {
            bs4pop.alert('Please input Name of Campaign.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var keyword_list = $('#mam_camp_keyword_list').val();
        if (!keyword_list.trim()) {
            bs4pop.alert('Please input Keyword List of Campaign.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var bs_key = $('#mam_bs_key').val();
        if (!bs_key.trim()) {
            bs4pop.alert('Please input Bing Azure api for Related Keywords in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var gy_key = $('#mam_gy_key').val();
        if (!gy_key.trim()) {
            bs4pop.alert('Please input Google api Key for Youtube in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var fb_access_token = $('#fb_access_token').val();
        if (!fb_access_token.trim()) {
            bs4pop.alert('Please input Facebook Access Token in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }
        var fb_page_name = $('#fb_page_name').val();
        if (!fb_page_name.trim()) {
            bs4pop.alert('Please input Facebook Page Name in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var tw_api_key = $('#tw_api_key').val();
        if (!tw_api_key.trim()) {
            bs4pop.alert('Please input Twitter Consumer Key in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var tw_api_secret = $('#tw_api_secret').val();
        if (!tw_api_secret.trim()) {
            bs4pop.alert('Please input Twitter Consumer Secret in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var tw_access_token = $('#tw_access_token').val();
        if (!tw_access_token.trim()) {
            bs4pop.alert('Please input Twitter Access Token in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var tw_token_secret = $('#tw_token_secret').val();
        if (!tw_token_secret.trim()) {
            bs4pop.alert('Please input Twitter Access Token Secret in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var fl_api_key = $('#fl_api_key').val();
        if (!fl_api_key.trim()) {
            bs4pop.alert('Please input Flickr Api Key in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var pi_api_key = $('#pi_api_key').val();
        if (!pi_api_key.trim()) {
            bs4pop.alert('Please input Pinterest Api Key in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var pi_keyword = $('#pi_keyword').val();
        if (!pi_keyword.trim()) {
            bs4pop.alert('Please input Pinterest Keyword in AUTH.', function () { console.log('You Clicked Okay'); return; });
            return;
        }

        var flag_fl = Number($('#mam_delete_firstline').next().css('color') == "rgb(61, 183, 217)");
        var flag_ll = Number($('#mam_delete_lastline').next().css('color') == "rgb(61, 183, 217)");
        var enable_related_keywords = $('#mam_enable_related_keywords').attr('checked') == "checked" ? 1 : 0;
        var enable_rss = $('#mam_enable_rss').attr('checked') == "checked" ? 1 : 0;
        var enable_facebook = $('#mam_enable_facebook').attr('checked') == "checked" ? 1 : 0;
        var enable_twitter = $('#mam_enable_twitter').attr('checked') == "checked" ? 1 : 0;
        var enable_flickr = $('#mam_enable_flickr').attr('checked') == "checked" ? 1 : 0;
        var enable_pinterest = $('#mam_enable_pinterest').attr('checked') == "checked" ? 1 : 0;
        $('.mam_camp_success_alert').hide();
        $('.mam_campain_progress_box').show();
        $('.mam_campaign_progress_bar').width("10%");
        $('.mam_campaign_progress_bar').text("10%");

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

        var fb_content = enable_facebook ? getFacebookPosts(fb_access_token, fb_page_name, facebook_limit) : '';
        var temp_name = $('#selected_template_name').val();
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
            $.ajax({
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
                    if (enable_rss) {
                        $.ajax({
                            url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?" + $.param(params),
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
                                var error = xhr.responseText;
                                sendLog("Bing Search: " + error + ".");
                                youtube_process(title, video_id, caption, tags, thumbnail, comments, temp_content, image_arr, rel_keyword_arr);
                            }
                        })
                    } else {
                        youtube_process(title, video_id, caption, tags, thumbnail, comments, temp_content, image_arr, rel_keyword_arr);
                    }
                    function youtube_process(title, video_id, caption, tags, thumbnail, comments, temp_content, image_arr, rel_keyword_arr) {
                        if (caption != '') {
                            var video_id = video_id;
                            var content = temp_content;
                            var category = $('#mam_post_category').val();
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
                            content = change_keyword(content, title);

                            var status = "publish";
                            var mamPostData = {
                                "kind": 'create_post', "title": title, "content": content,
                                "status": status, "tags": tags, "category": category,
                                "comments": comments, "thumbnail": thumbnail, "rss_limit": rss_limit,
                                "tw_info": tw_info, "pi_info": pi_info, "fl_api_key": fl_api_key,
                                "twitter_limit": twitter_limit, "flickr_limit": flickr_limit,
                                "pinterest_limit": pinterest_limit, "enable_twitter": enable_twitter,
                                "enable_flickr": enable_flickr, "enable_pinterest": enable_pinterest
                            };

                            $.ajax({
                                url: '../wp-content/plugins/mass-api-manager/mam_request.php',
                                data: mamPostData,
                                type: 'post',
                                success: function (result) {
                                    console.log(result);
                                    success_count++;
                                    var percent = 100 * (success_count + fail_count) / count;
                                    $('.mam_campaign_progress_bar').width(percent + "%");
                                    $('.mam_campaign_progress_bar').text(percent + "%");
                                    show_progress_bar(keyword_arr[n], 1);
                                },
                                error: function (xhr) {
                                    var error = xhr.responseText;
                                    sendLog("Post: " + error + ".");
                                    fail_count++;
                                    show_progress_bar(keyword_arr[n], 0);
                                }
                            })
                        } else {
                            fail_count++;
                            var percent = 100 * (success_count + fail_count) / count;
                            $('.mam_campaign_progress_bar').width(percent + "%");
                            $('.mam_campaign_progress_bar').text(percent + "%");
                        }
                        show_progress_bar();
                        setTimeout(function () {
                            myGetYoutube(n - 1);
                        }, interval * 60 * 1000);
                    }
                },
                error: function (xhr) {
                    var error = xhr.responseText;
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
                $.ajax({
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
                        $('#camp_table_body').html(tbody);
                        var tbody1 = "";
                        logs.forEach(element => {
                            tbody1 += "<tr>" +
                                "<td>" + element["id"] + "</td>" +
                                "<td>" + element["log"] + "</td>" +
                                "<td>" + element["create_date"] + "</td>" +
                                "</tr>";
                        })
                        $('#log_table_body').html(tbody1);
                    }
                })
                $('.mam_campaign_spinner_box').hide();
                $('.mam_campain_progress_box').hide();
                $('.mam_camp_success_alert').html('<strong>Completed!</strong><span class="badge badge-success">' + success_count + '</span>' + " posts are created."
                    + '<span class="badge badge-warning">' + fail_count + '</span>' + " keywords are failed.");
                $('.mam_camp_success_alert').show();
            }
        }
    }

    function getFacebookPosts(access_token, page_name, count) {
        var api_version = "v4.0";
        var base_url = "https://graph.facebook.com/" + api_version + "/";
        var account_url = base_url + "pages/search?q=" + page_name + "&access_token=" + access_token;
        var page_id;
        $.ajax({
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
            $.ajax({
                async: false,
                type: "get",
                data: {},
                url: post_url + access_token,
                success: function (result) {
                    var items = result["data"];
                    items.forEach(element => {
                        fb_container += "<div class='mam_show_item col-md-6'>";
                        var message = element["message"] != undefined ? element["message"] : "";
                        var story = element["story"] != undefined ? element["story"] : page_name;
                        var post_date = element["created_time"];
                        var fb_post_id = element["id"];
                        $.ajax({
                            type: "get",
                            data: {},
                            async: false,
                            url: base_url + fb_post_id + "/attachments?access_token=" + access_token,
                            success: function (result) {
                                var data = result["data"][0];
                                var img_url = "";
                                var target_url = "";
                                if (data) {
                                    if (data["subattachments"])
                                        img_url = data["subattachments"]["data"][0]["media"] != undefined ? data["subattachments"]["data"][0]["media"]["image"]["src"] : '';
                                    else if (data["media"]){
                                        img_url = data["media"] != undefined ? data["media"]["image"]["src"] : '';
                                    }
                                    var target_url = (data["target"]) ? data["target"]["url"] : '';
                                }
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
        $.ajax({
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


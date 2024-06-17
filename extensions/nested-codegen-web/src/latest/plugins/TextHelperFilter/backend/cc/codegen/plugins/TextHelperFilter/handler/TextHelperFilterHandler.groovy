package cc.codegen.plugins.TextHelperFilter.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil

class TextHelperFilterHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "filter"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                def res = (bytes_text)
                def config_line_sep_char = extHandleItem.getConfigLineSepChar()
                def list = extHandleItem.getTextHelperByValue(value, extHandleItem)
                def finalValue = list;
//                def finalValue = extHandleItem.getTextHelperFilterScriptResult(list)
                return ResFunc.ok([value: finalValue.join(config_line_sep_char)])
            }
        }])
    }

}
